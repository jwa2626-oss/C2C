/**
 * Data access layer – wraps Supabase queries used across the app.
 * All functions return structured data ready for UI consumption.
 */

import { createClient } from "@/lib/supabase/server";

// Explicit return types for join queries (Supabase generic resolution issue with custom DB types)
export type RecentConversation = {
  id: string;
  date: string;
  location: string;
  town: string;
  processing_status: string;
  listeners: { name: string }[] | { name: string } | null;
};

export type InsightWithConversation = {
  id: string;
  theme: string;
  quote: string;
  summary: string;
  sentiment: string;
  conversations: { town: string; date: string } | null;
};

export async function getDashboardStats() {
  const supabase = await createClient();

  const [conversationsResult, insightsResult, surveysResult] = await Promise.all([
    supabase.from("conversations").select("id, town, processing_status", { count: "exact" }),
    supabase.from("insights").select("id", { count: "exact" }),
    supabase.from("survey_data").select("belonging_score, pride_score, influence_score, community_participation_score"),
  ]);

  const conversations = (conversationsResult.data ?? []) as { id: string; town: string; processing_status: string }[];
  const insightsCount = insightsResult.count ?? 0;
  const surveys = (surveysResult.data ?? []) as { belonging_score: number | null; pride_score: number | null; influence_score: number | null; community_participation_score: number | null }[];

  const towns = new Set(conversations.map((c) => c.town));

  const avgBelonging =
    surveys.length > 0
      ? surveys.reduce((s, r) => s + (r.belonging_score ?? 0), 0) / surveys.filter((r) => r.belonging_score != null).length
      : 0;

  const avgInfluence =
    surveys.length > 0
      ? surveys.reduce((s, r) => s + (r.influence_score ?? 0), 0) / surveys.filter((r) => r.influence_score != null).length
      : 0;

  return {
    totalConversations: conversationsResult.count ?? 0,
    totalLocations: towns.size,
    totalInsights: insightsCount,
    avgBelonging: Number(avgBelonging.toFixed(1)),
    avgInfluence: Number(avgInfluence.toFixed(1)),
  };
}

export async function getThemeBreakdown() {
  const supabase = await createClient();
  const { data } = await supabase.from("insights").select("theme");

  if (!data) return [];

  const counts: Record<string, number> = {
    everyday_life: 0,
    decision_making: 0,
    imagining_better: 0,
  };

  for (const insight of (data as { theme: string }[])) {
    counts[insight.theme] = (counts[insight.theme] ?? 0) + 1;
  }

  return [
    { theme: "Everyday Life", count: counts.everyday_life, color: "#3B82F6" },
    { theme: "Decision Making", count: counts.decision_making, color: "#8B5CF6" },
    { theme: "Imagining Better", count: counts.imagining_better, color: "#10B981" },
  ];
}

export async function getSentimentData() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("survey_data")
    .select("belonging_score, pride_score, influence_score, community_participation_score");

  if (!data || data.length === 0) {
    return { belonging: 0, pride: 0, influence: 0, participation: 0, count: 0 };
  }

  type SurveyRow = { belonging_score: number | null; pride_score: number | null; influence_score: number | null; community_participation_score: number | null };
  const rows = data as SurveyRow[];
  const count = rows.length;

  const avg = (key: keyof SurveyRow) => {
    const vals = rows.map((r) => r[key]).filter((v) => v != null) as number[];
    return Number((vals.length > 0 ? vals.reduce((a, b) => a + b, 0) / vals.length : 0).toFixed(1));
  };

  return {
    belonging: avg("belonging_score"),
    pride: avg("pride_score"),
    influence: avg("influence_score"),
    participation: avg("community_participation_score"),
    count,
  };
}

export async function getRecentConversations(limit = 5): Promise<RecentConversation[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("conversations")
    .select("id, date, location, town, processing_status, listeners(name)")
    .order("created_at", { ascending: false })
    .limit(limit);

  return (data ?? []) as unknown as RecentConversation[];
}

export async function getInsightsByTheme(
  theme?: "everyday_life" | "decision_making" | "imagining_better",
  search?: string,
  limit = 20
): Promise<InsightWithConversation[]> {
  const supabase = await createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let query: any = supabase
    .from("insights")
    .select("id, theme, quote, summary, sentiment, conversations(town, date)")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (theme) query = query.eq("theme", theme);
  if (search) query = query.ilike("quote", `%${search}%`);

  const { data } = await query;
  return (data ?? []) as InsightWithConversation[];
}

export async function getConversationLocations() {
  const supabase = await createClient();
  const { data } = await supabase.from("conversations").select("town, location");

  if (!data) return [];

  const counts: Record<string, { town: string; count: number }> = {};
  for (const conv of (data as { town: string; location: string }[])) {
    if (!counts[conv.town]) counts[conv.town] = { town: conv.town, count: 0 };
    counts[conv.town].count++;
  }

  return Object.values(counts).sort((a, b) => b.count - a.count);
}
