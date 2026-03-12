import { getSentimentData } from "@/lib/data";

function ScoreBar({
  label,
  score,
  color,
}: {
  label: string;
  score: number;
  color: string;
}) {
  const pct = (score / 5) * 100;
  const scoreColor =
    score >= 3.5 ? "text-emerald-600" : score >= 2.5 ? "text-amber-600" : "text-rose-600";

  return (
    <div className="flex items-center gap-4">
      <p className="w-36 text-sm font-medium text-gray-700 shrink-0">{label}</p>
      <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <span className={`w-14 text-right text-sm font-bold ${scoreColor}`}>
        {score > 0 ? `${score} / 5` : "–"}
      </span>
    </div>
  );
}

export async function SentimentOverview() {
  const sentiment = await getSentimentData();

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Community Sentiment</h2>
          <p className="text-sm text-gray-500">
            Average exit survey scores across all participants
          </p>
        </div>
        {sentiment.count > 0 && (
          <span className="text-sm text-gray-400">{sentiment.count} responses</span>
        )}
      </div>

      {sentiment.count === 0 ? (
        <p className="text-gray-400 text-sm text-center py-4">
          No survey responses yet.
        </p>
      ) : (
        <div className="space-y-4">
          <ScoreBar label="Sense of Belonging" score={sentiment.belonging} color="#3B82F6" />
          <ScoreBar label="Community Pride" score={sentiment.pride} color="#8B5CF6" />
          <ScoreBar label="Influence in Decisions" score={sentiment.influence} color="#EF4444" />
          <ScoreBar label="Community Participation" score={sentiment.participation} color="#10B981" />
        </div>
      )}

      {sentiment.influence > 0 && sentiment.influence < 2.5 && (
        <div className="mt-4 p-3 bg-rose-50 rounded-lg">
          <p className="text-sm text-rose-700 font-medium">
            Key finding: Residents report low influence in local decisions ({sentiment.influence}/5)
          </p>
        </div>
      )}
    </div>
  );
}
