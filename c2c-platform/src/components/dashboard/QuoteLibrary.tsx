import { getInsightsByTheme } from "@/lib/data";
import Link from "next/link";

const themeColors = {
  everyday_life: "bg-blue-50 text-blue-700 border-blue-100",
  decision_making: "bg-purple-50 text-purple-700 border-purple-100",
  imagining_better: "bg-emerald-50 text-emerald-700 border-emerald-100",
};

const themeLabels = {
  everyday_life: "Everyday Life",
  decision_making: "Decision Making",
  imagining_better: "Imagining Better",
};

const sentimentEmoji = {
  positive: "😊",
  negative: "😔",
  neutral: "😐",
  mixed: "🤔",
};

export async function QuoteLibrary() {
  const insights = await getInsightsByTheme(undefined, undefined, 4);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Quote Library</h2>
        <Link
          href="/insights"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Browse all
        </Link>
      </div>

      {insights.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-8">
          No quotes yet. Insights will appear once conversations are processed.
        </p>
      ) : (
        <div className="space-y-3">
          {insights.map((insight) => {
            const themeKey = insight.theme as keyof typeof themeColors;
            const convData = Array.isArray(insight.conversations)
              ? insight.conversations[0]
              : insight.conversations as { town: string } | null;

            return (
              <div key={insight.id} className="p-3 rounded-lg bg-gray-50">
                <blockquote className="text-sm text-gray-700 italic mb-2 leading-relaxed">
                  &ldquo;{insight.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full border ${themeColors[themeKey]}`}
                  >
                    {themeLabels[themeKey]}
                  </span>
                  <span className="text-xs text-gray-400">
                    {sentimentEmoji[insight.sentiment as keyof typeof sentimentEmoji]}{" "}
                    {insight.sentiment}
                  </span>
                  {convData && (
                    <span className="text-xs text-gray-400">{convData.town}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
