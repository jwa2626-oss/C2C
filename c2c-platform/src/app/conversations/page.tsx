import { createClient } from "@/lib/supabase/server";
import { format } from "date-fns";
import { MapPin, CheckCircle, Clock, Loader, AlertCircle, FileAudio } from "lucide-react";
import Link from "next/link";

const STATUS_CONFIG = {
  pending: { label: "Pending", icon: Clock, color: "text-gray-500 bg-gray-50 border-gray-200" },
  transcribing: { label: "Transcribing", icon: Loader, color: "text-blue-600 bg-blue-50 border-blue-100" },
  analysing: { label: "Analysing", icon: Loader, color: "text-purple-600 bg-purple-50 border-purple-100" },
  complete: { label: "Complete", icon: CheckCircle, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
  error: { label: "Error", icon: AlertCircle, color: "text-rose-600 bg-rose-50 border-rose-100" },
};

type ConvRow = {
  id: string;
  date: string;
  location: string;
  town: string;
  processing_status: string;
  created_at: string;
  audio_file_1_url: string | null;
  audio_file_2_url: string | null;
  listeners: { name: string }[] | { name: string } | null;
  insights: { id: string }[];
};

export default async function ConversationsPage() {
  const supabase = await createClient();
  const { data: conversations } = await supabase
    .from("conversations")
    .select(`
      id, date, location, town, processing_status, created_at,
      audio_file_1_url, audio_file_2_url,
      listeners(name),
      insights(id)
    `)
    .order("created_at", { ascending: false });

  const rows = (conversations ?? []) as unknown as ConvRow[];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Conversations</h1>
          <p className="mt-1 text-gray-500">{rows.length} conversation{rows.length !== 1 ? "s" : ""} recorded</p>
        </div>
        <Link
          href="/submit"
          className="bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          + Submit new
        </Link>
      </div>

      {rows.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <FileAudio className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 font-medium">No conversations yet</p>
          <Link
            href="/submit"
            className="mt-3 inline-block text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Submit your first conversation →
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100 overflow-hidden">
          {rows.map((conv) => {
            const status = STATUS_CONFIG[conv.processing_status as keyof typeof STATUS_CONFIG] ?? STATUS_CONFIG.pending;
            const StatusIcon = status.icon;
            const listenerName = Array.isArray(conv.listeners)
              ? conv.listeners[0]?.name
              : (conv.listeners as { name: string } | null)?.name;
            const insightCount = Array.isArray(conv.insights) ? conv.insights.length : 0;

            return (
              <div key={conv.id} className="p-5 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="flex items-center gap-1.5 text-base font-semibold text-gray-900">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        {conv.town}
                      </div>
                      <span className="text-gray-400 text-sm">&middot;</span>
                      <span className="text-sm text-gray-500">
                        {conv.location}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {listenerName ?? "Unknown listener"} ·{" "}
                      {conv.date ? format(new Date(conv.date), "d MMMM yyyy") : "Unknown date"}
                    </p>
                    {insightCount > 0 && (
                      <p className="text-xs text-emerald-600 font-medium mt-1">
                        {insightCount} insight{insightCount !== 1 ? "s" : ""} extracted
                      </p>
                    )}
                  </div>

                  <span
                    className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border shrink-0 ${status.color}`}
                  >
                    <StatusIcon className={`w-3.5 h-3.5 ${conv.processing_status === "transcribing" || conv.processing_status === "analysing" ? "animate-spin" : ""}`} />
                    {status.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
