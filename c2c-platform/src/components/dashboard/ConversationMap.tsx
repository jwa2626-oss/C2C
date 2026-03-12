import { getConversationLocations } from "@/lib/data";
import { MapPin } from "lucide-react";

export async function ConversationMap() {
  const locations = await getConversationLocations();

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Conversations by Location
      </h2>

      {locations.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-8">
          No conversations recorded yet.
        </p>
      ) : (
        <div className="space-y-2">
          {locations.slice(0, 10).map(({ town, count }, i) => {
            const maxCount = locations[0].count;
            const barWidth = Math.max((count / maxCount) * 100, 4);

            return (
              <div key={town} className="flex items-center gap-3">
                <span className="text-xs text-gray-400 w-4">{i + 1}</span>
                <div className="flex-1 flex items-center gap-2 min-w-0">
                  <div className="flex items-center gap-1 w-28 shrink-0">
                    <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span className="text-sm font-medium text-gray-800 truncate">
                      {town}
                    </span>
                  </div>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-blue-500 transition-all"
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-gray-600 w-6 text-right shrink-0">
                    {count}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {locations.length > 10 && (
        <p className="text-xs text-gray-400 mt-3">
          +{locations.length - 10} more locations
        </p>
      )}
    </div>
  );
}
