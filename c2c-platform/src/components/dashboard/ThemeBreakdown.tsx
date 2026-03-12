import { getThemeBreakdown } from "@/lib/data";

export async function ThemeBreakdown() {
  const themes = await getThemeBreakdown();
  const total = themes.reduce((s, t) => s + t.count, 0);

  const themeDescriptions: Record<string, string> = {
    "Everyday Life": "Day-to-day experiences, community, local services",
    "Decision Making": "Power, voice, feeling heard or excluded",
    "Imagining Better": "Hope, ideas, visions for the future",
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Listening Themes</h2>

      {total === 0 ? (
        <p className="text-gray-400 text-sm text-center py-8">
          No insights yet. Submit conversations to see themes emerge.
        </p>
      ) : (
        <div className="space-y-4">
          {themes.map(({ theme, count, color }) => {
            const pct = total > 0 ? Math.round((count / total) * 100) : 0;
            return (
              <div key={theme}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{theme}</p>
                    <p className="text-xs text-gray-400">{themeDescriptions[theme]}</p>
                  </div>
                  <span className="text-sm font-semibold text-gray-700 ml-4">
                    {count} ({pct}%)
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${pct}%`, backgroundColor: color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {total > 0 && (
        <p className="text-xs text-gray-400 mt-4">{total} total insights extracted</p>
      )}
    </div>
  );
}
