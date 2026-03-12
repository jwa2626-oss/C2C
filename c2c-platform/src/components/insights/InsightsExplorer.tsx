"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, Filter } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Theme = "everyday_life" | "decision_making" | "imagining_better" | "all";
type Sentiment = "positive" | "negative" | "neutral" | "mixed" | "all";

interface Insight {
  id: string;
  theme: string;
  quote: string;
  summary: string;
  sentiment: string;
  conversations: { town: string; date: string } | null;
}

const THEME_OPTIONS: { value: Theme; label: string; color: string }[] = [
  { value: "all", label: "All themes", color: "bg-gray-100 text-gray-700" },
  { value: "everyday_life", label: "Everyday Life", color: "bg-blue-100 text-blue-700" },
  { value: "decision_making", label: "Decision Making", color: "bg-purple-100 text-purple-700" },
  { value: "imagining_better", label: "Imagining Better", color: "bg-emerald-100 text-emerald-700" },
];

const SENTIMENT_EMOJI: Record<string, string> = {
  positive: "😊",
  negative: "😔",
  neutral: "😐",
  mixed: "🤔",
};

const THEME_COLORS: Record<string, string> = {
  everyday_life: "bg-blue-50 text-blue-700 border-blue-100",
  decision_making: "bg-purple-50 text-purple-700 border-purple-100",
  imagining_better: "bg-emerald-50 text-emerald-700 border-emerald-100",
};

const THEME_LABELS: Record<string, string> = {
  everyday_life: "Everyday Life",
  decision_making: "Decision Making",
  imagining_better: "Imagining Better",
};

export function InsightsExplorer() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState<Theme>("all");
  const [sentiment, setSentiment] = useState<Sentiment>("all");

  const fetchInsights = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();
    let query = supabase
      .from("insights")
      .select("id, theme, quote, summary, sentiment, conversations(town, date)")
      .order("created_at", { ascending: false })
      .limit(50);

    if (theme !== "all") query = query.eq("theme", theme);
    if (sentiment !== "all") query = query.eq("sentiment", sentiment);
    if (search.trim()) query = query.ilike("quote", `%${search.trim()}%`);

    const { data } = await query;
    setInsights((data as Insight[]) ?? []);
    setLoading(false);
  }, [theme, sentiment, search]);

  useEffect(() => {
    const timer = setTimeout(fetchInsights, search ? 400 : 0);
    return () => clearTimeout(timer);
  }, [fetchInsights, search]);

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search quotes…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1 text-xs text-gray-500 mr-1">
            <Filter className="w-3.5 h-3.5" />
            Theme:
          </div>
          {THEME_OPTIONS.map(({ value, label, color }) => (
            <button
              key={value}
              onClick={() => setTheme(value)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                theme === value
                  ? `${color} ring-2 ring-offset-1 ring-current`
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1 text-xs text-gray-500 mr-1">
            Sentiment:
          </div>
          {(["all", "positive", "negative", "neutral", "mixed"] as Sentiment[]).map((s) => (
            <button
              key={s}
              onClick={() => setSentiment(s)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all capitalize ${
                sentiment === s
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {s === "all" ? "All" : `${SENTIMENT_EMOJI[s]} ${s}`}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-40 rounded-xl bg-gray-200 animate-pulse" />
          ))}
        </div>
      ) : insights.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg font-medium">No insights found</p>
          <p className="text-sm mt-1">Try adjusting your filters or search term.</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-500">{insights.length} insight{insights.length !== 1 ? "s" : ""} found</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insights.map((insight) => {
              const themeKey = insight.theme as keyof typeof THEME_COLORS;
              const convData = insight.conversations;

              return (
                <div
                  key={insight.id}
                  className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-sm transition-shadow"
                >
                  <blockquote className="text-sm text-gray-800 italic leading-relaxed mb-3">
                    &ldquo;{insight.quote}&rdquo;
                  </blockquote>

                  <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                    {insight.summary}
                  </p>

                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full border ${THEME_COLORS[themeKey]}`}
                    >
                      {THEME_LABELS[themeKey] ?? insight.theme}
                    </span>
                    <span className="text-xs text-gray-500 capitalize">
                      {SENTIMENT_EMOJI[insight.sentiment]} {insight.sentiment}
                    </span>
                    {convData && (
                      <span className="text-xs text-gray-400 ml-auto">
                        {convData.town}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
