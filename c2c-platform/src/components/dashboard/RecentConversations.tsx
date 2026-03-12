import { getRecentConversations } from "@/lib/data";
import Link from "next/link";
import { MapPin, Clock, CheckCircle, AlertCircle, Loader } from "lucide-react";
import { format } from "date-fns";

const statusConfig = {
  pending: { label: "Pending", icon: Clock, color: "text-gray-400 bg-gray-50" },
  transcribing: { label: "Transcribing", icon: Loader, color: "text-blue-600 bg-blue-50" },
  analysing: { label: "Analysing", icon: Loader, color: "text-purple-600 bg-purple-50" },
  complete: { label: "Complete", icon: CheckCircle, color: "text-emerald-600 bg-emerald-50" },
  error: { label: "Error", icon: AlertCircle, color: "text-rose-600 bg-rose-50" },
};

export async function RecentConversations() {
  const conversations = await getRecentConversations(5);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Recent Conversations</h2>
        <Link
          href="/conversations"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          View all
        </Link>
      </div>

      {conversations.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-400 text-sm">No conversations yet.</p>
          <Link
            href="/submit"
            className="mt-2 inline-block text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Submit the first conversation →
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {conversations.map((conv) => {
            const status = statusConfig[conv.processing_status as keyof typeof statusConfig] ?? statusConfig.pending;
            const StatusIcon = status.icon;
            const listenerName = Array.isArray(conv.listeners)
              ? conv.listeners[0]?.name
              : (conv.listeners as { name: string } | null)?.name;

            return (
              <div
                key={conv.id}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 text-sm font-medium text-gray-900">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span className="truncate">{conv.town}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {listenerName ?? "Unknown listener"} ·{" "}
                    {conv.date
                      ? format(new Date(conv.date), "d MMM yyyy")
                      : "Unknown date"}
                  </p>
                </div>
                <span
                  className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full shrink-0 ml-2 ${status.color}`}
                >
                  <StatusIcon className="w-3 h-3" />
                  {status.label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
