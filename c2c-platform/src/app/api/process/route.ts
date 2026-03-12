/**
 * POST /api/process
 * Triggers audio transcription and AI insight extraction for a conversation.
 * Called after a successful form submission.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { transcribeConversation } from "@/lib/transcription";
import { extractInsights } from "@/lib/insights";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { conversationId } = body as { conversationId: string };

    if (!conversationId) {
      return NextResponse.json(
        { error: "conversationId is required" },
        { status: 400 }
      );
    }

    // Using untyped client for update operations to avoid generic resolution issues
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase = createAdminClient() as any;

    const updateStatus = async (status: string) => {
      await supabase
        .from("conversations")
        .update({ processing_status: status })
        .eq("id", conversationId);
    };

    // Fetch conversation details
    const { data: conversation, error: fetchError } = await supabase
      .from("conversations")
      .select("id, audio_file_1_url, audio_file_2_url, town, location")
      .eq("id", conversationId)
      .single();

    if (fetchError || !conversation) {
      return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
    }

    // Step 1: Transcription
    await updateStatus("transcribing");

    let transcript: string;
    try {
      transcript = await transcribeConversation(
        conversation.audio_file_1_url as string | null,
        conversation.audio_file_2_url as string | null
      );
    } catch (err) {
      await updateStatus("error");
      throw err;
    }

    // Save transcript and mark as analysing
    await supabase
      .from("conversations")
      .update({ transcript, processing_status: "analysing" })
      .eq("id", conversationId);

    // Step 2: AI insight extraction
    const location = `${conversation.location}, ${conversation.town}`;
    let insights;
    try {
      insights = await extractInsights(transcript, location);
    } catch (err) {
      await updateStatus("error");
      throw err;
    }

    // Save insights
    if (insights.length > 0) {
      await supabase.from("insights").insert(
        insights.map((insight: { theme: string; quote: string; summary: string; sentiment: string }) => ({
          conversation_id: conversationId,
          theme: insight.theme,
          quote: insight.quote,
          summary: insight.summary,
          sentiment: insight.sentiment,
        }))
      );
    }

    // Mark complete
    await updateStatus("complete");

    return NextResponse.json({
      success: true,
      insightsExtracted: insights.length,
    });
  } catch (error) {
    console.error("Processing error:", error);
    return NextResponse.json(
      { error: "Processing failed", detail: String(error) },
      { status: 500 }
    );
  }
}
