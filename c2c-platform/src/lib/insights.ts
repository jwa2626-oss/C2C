/**
 * AI Insight Extraction Engine
 * Uses Claude to extract structured insights from conversation transcripts,
 * aligned with the three C2C listening themes.
 */

import Anthropic from "@anthropic-ai/sdk";

function getClient() {
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
}

export interface ExtractedInsight {
  theme: "everyday_life" | "decision_making" | "imagining_better";
  quote: string;
  summary: string;
  sentiment: "positive" | "negative" | "neutral" | "mixed";
}

const SYSTEM_PROMPT = `You are an expert community listening analyst working for the C2C (Coast-to-Coast) Listening Intelligence Platform. Your role is to analyse transcripts of community conversations and extract structured insights.

The three core listening themes are:

1. **Everyday Life** – Experiences of day-to-day living: family, work, local services, transport, housing, health, community connections, what people value and struggle with locally.

2. **Decision Making** – Experiences of power, voice and participation: who makes decisions, whether people feel heard, trust in institutions, experiences of exclusion or inclusion in civic life.

3. **Imagining Better** – Hopes, aspirations and ideas: what people wish were different, what they dream for their community, solutions they propose, visions for a better future.

Extract 5–15 key insights from the transcript. For each insight:
- Select the most powerful, representative direct quote
- Write a one-sentence summary of the insight
- Assign the most appropriate theme
- Assess the emotional sentiment

Return ONLY a valid JSON array with no markdown, no explanations, just the JSON.`;

const USER_PROMPT = (transcript: string, location: string) =>
  `Analyse this conversation transcript from ${location}.

TRANSCRIPT:
${transcript}

Return a JSON array of insights. Each insight must have:
- "theme": one of "everyday_life", "decision_making", "imagining_better"
- "quote": exact verbatim quote from the transcript (20–100 words)
- "summary": one sentence summarising the insight (max 30 words)
- "sentiment": one of "positive", "negative", "neutral", "mixed"

Example:
[
  {
    "theme": "decision_making",
    "quote": "Nobody ever asks us what we think. The council makes decisions and we just have to live with them.",
    "summary": "Residents feel excluded from local decision-making processes.",
    "sentiment": "negative"
  }
]`;

export async function extractInsights(
  transcript: string,
  location: string
): Promise<ExtractedInsight[]> {
  const client = getClient();
  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4096,
    messages: [
      {
        role: "user",
        content: USER_PROMPT(transcript, location),
      },
    ],
    system: SYSTEM_PROMPT,
  });

  const content = message.content[0];
  if (content.type !== "text") {
    throw new Error("Unexpected response type from Claude");
  }

  // Strip any accidental markdown fences
  const raw = content.text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();

  const insights: ExtractedInsight[] = JSON.parse(raw);

  // Validate structure
  const valid = insights.filter(
    (i) =>
      ["everyday_life", "decision_making", "imagining_better"].includes(i.theme) &&
      typeof i.quote === "string" &&
      typeof i.summary === "string" &&
      ["positive", "negative", "neutral", "mixed"].includes(i.sentiment)
  );

  return valid;
}
