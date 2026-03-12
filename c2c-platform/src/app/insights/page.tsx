import { InsightsExplorer } from "@/components/insights/InsightsExplorer";

export default function InsightsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Insights Explorer</h1>
        <p className="mt-1 text-gray-500">
          Search and browse quotes extracted from community conversations.
        </p>
      </div>
      <InsightsExplorer />
    </div>
  );
}
