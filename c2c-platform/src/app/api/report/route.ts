/**
 * POST /api/report
 * Generates a structured insight report for a given location or all locations.
 * Uses Claude to synthesise insights into a readable briefing.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import Anthropic from "@anthropic-ai/sdk";

export async function POST(request: NextRequest) {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  try {
    const body = await request.json();
    const { town } = body as { town?: string };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase = createAdminClient() as any;

    // Fetch insights with conversation metadata
    let query = supabase
      .from("insights")
      .select(`
        theme, quote, summary, sentiment,
        conversations!inner(town, date)
      `)
      .order("created_at", { ascending: false });

    if (town) {
      query = query.eq("conversations.town", town);
    }

    const { data: insights } = await query.limit(100);

    if (!insights || insights.length === 0) {
      return NextResponse.json({ error: "No insights found for this location" }, { status: 404 });
    }

    // Fetch sentiment averages
    let surveyQuery = supabase
      .from("survey_data")
      .select("belonging_score, pride_score, influence_score, community_participation_score, conversations!inner(town)");

    if (town) {
      surveyQuery = surveyQuery.eq("conversations.town", town);
    }

    const { data: surveys } = await surveyQuery;
    const surveyCount = surveys?.length ?? 0;

    type SurveyRow = { belonging_score: number | null; pride_score: number | null; influence_score: number | null; community_participation_score: number | null };
    const avgScore = (key: keyof SurveyRow) => {
      if (!surveys || surveys.length === 0) return null;
      const vals = (surveys as SurveyRow[]).map((s) => s[key]).filter((v) => v != null) as number[];
      return vals.length > 0 ? (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1) : null;
    };

    const sentimentSummary = {
      belonging: avgScore("belonging_score"),
      pride: avgScore("pride_score"),
      influence: avgScore("influence_score"),
      participation: avgScore("community_participation_score"),
      count: surveyCount,
    };

    type InsightRow = { theme: string; quote: string; summary: string; sentiment: string; conversations: { town: string; date: string } };
    // Build insights summary for Claude
    const insightsSummary = (insights as InsightRow[])
      .map((i) => `[${i.theme}] "${i.quote}" — ${i.summary} (${i.sentiment})`)
      .join("\n");

    const prompt = `You are writing a community listening briefing for policymakers and civic leaders.

Location: ${town ?? "All locations across the North"}
Conversations analysed: ${new Set((insights as InsightRow[]).map((i) => i.conversations?.town)).size} locations
Participants surveyed: ${surveyCount}
Sentiment scores (out of 5): Belonging ${sentimentSummary.belonging ?? "N/A"}, Pride ${sentimentSummary.pride ?? "N/A"}, Influence ${sentimentSummary.influence ?? "N/A"}, Participation ${sentimentSummary.participation ?? "N/A"}

EXTRACTED INSIGHTS:
${insightsSummary}

Write a concise briefing with these sections:
1. **Overview** (2-3 sentences)
2. **Major Concerns** (3-5 bullet points with supporting quotes)
3. **Community Strengths** (2-3 bullet points)
4. **What People Want** (from the "Imagining Better" theme, 3-5 bullet points)
5. **Recommended Actions** (3-5 specific, actionable recommendations for policymakers)
6. **Key Quote** (one powerful representative quote)

Use plain, accessible language. Be direct. Ground everything in the actual quotes.`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2000,
      messages: [{ role: "user", content: prompt }],
    });

    const report = message.content[0].type === "text" ? message.content[0].text : "";

    return NextResponse.json({
      report,
      metadata: {
        town: town ?? "All locations",
        insightCount: insights.length,
        sentimentSummary,
      },
    });
  } catch (error) {
    console.error("Report generation error:", error);
    return NextResponse.json(
      { error: "Report generation failed", detail: String(error) },
      { status: 500 }
    );
  }
}
