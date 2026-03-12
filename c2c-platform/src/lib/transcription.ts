/**
 * Audio Processing Engine
 * Uses OpenAI Whisper API to transcribe audio files.
 */

import OpenAI from "openai";

function getOpenAI() {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

/**
 * Transcribe a single audio file URL using OpenAI Whisper.
 * Downloads the audio then sends it for transcription.
 */
export async function transcribeAudio(audioUrl: string): Promise<string> {
  const openai = getOpenAI();

  const response = await fetch(audioUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch audio: ${response.statusText}`);
  }

  const buffer = await response.arrayBuffer();
  const blob = new Blob([buffer]);

  const ext = audioUrl.split("?")[0].split(".").pop() ?? "mp3";
  const fileName = `audio.${ext}`;

  const file = new File([blob], fileName, { type: `audio/${ext}` });

  const transcript = await openai.audio.transcriptions.create({
    file,
    model: "whisper-1",
    response_format: "text",
    language: "en",
  });

  return transcript as unknown as string;
}

/**
 * Transcribe multiple audio files and combine their transcripts.
 */
export async function transcribeConversation(
  audioUrl1: string | null,
  audioUrl2: string | null
): Promise<string> {
  const parts: string[] = [];

  if (audioUrl1) {
    const t1 = await transcribeAudio(audioUrl1);
    parts.push(`[Recording 1]\n${t1}`);
  }

  if (audioUrl2) {
    const t2 = await transcribeAudio(audioUrl2);
    parts.push(`[Recording 2]\n${t2}`);
  }

  return parts.join("\n\n---\n\n");
}
