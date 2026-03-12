"use client";

import { useState } from "react";
import { FileText, Loader, Download } from "lucide-react";

export default function ReportsPage() {
  const [town, setTown] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<{
    town: string;
    insightCount: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateReport = async () => {
    setLoading(true);
    setError(null);
    setReport(null);

    try {
      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ town: town.trim() || undefined }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Failed to generate report");
      } else {
        setReport(data.report);
        setMetadata(data.metadata);
      }
    } catch {
      setError("Network error – please try again.");
    }

    setLoading(false);
  };

  const downloadReport = () => {
    if (!report) return;
    const blob = new Blob([report], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `c2c-report-${metadata?.town ?? "all"}-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Render markdown-like report
  const renderReport = (text: string) => {
    return text.split("\n").map((line, i) => {
      if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <h3 key={i} className="text-base font-bold text-gray-900 mt-5 mb-2">
            {line.replace(/\*\*/g, "")}
          </h3>
        );
      }
      if (line.startsWith("- ") || line.startsWith("• ")) {
        return (
          <li key={i} className="text-sm text-gray-700 ml-4 mb-1">
            {line.slice(2)}
          </li>
        );
      }
      if (line.trim() === "") return <br key={i} />;
      return (
        <p key={i} className="text-sm text-gray-700 mb-2 leading-relaxed">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Generate Report</h1>
        <p className="mt-1 text-gray-500">
          Produce an evidence briefing from community conversations for policymakers.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Town / city (leave blank for all locations)
          </label>
          <input
            type="text"
            value={town}
            onChange={(e) => setTown(e.target.value)}
            placeholder="e.g. Scarborough"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={generateReport}
          disabled={loading}
          className="flex items-center gap-2 bg-blue-600 text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <Loader className="w-4 h-4 animate-spin" />
          ) : (
            <FileText className="w-4 h-4" />
          )}
          {loading ? "Generating…" : "Generate report"}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-sm text-rose-700">
          {error}
        </div>
      )}

      {report && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
            <div>
              <h2 className="font-semibold text-gray-900">
                {metadata?.town ?? "All Locations"} Listening Insights
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Based on {metadata?.insightCount} insights · Generated{" "}
                {new Date().toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <button
              onClick={downloadReport}
              className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
          <div className="px-6 py-5">{renderReport(report)}</div>
        </div>
      )}
    </div>
  );
}
