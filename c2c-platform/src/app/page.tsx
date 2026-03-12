import { Suspense } from "react";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { ThemeBreakdown } from "@/components/dashboard/ThemeBreakdown";
import { SentimentOverview } from "@/components/dashboard/SentimentOverview";
import { RecentConversations } from "@/components/dashboard/RecentConversations";
import { QuoteLibrary } from "@/components/dashboard/QuoteLibrary";
import { ConversationMap } from "@/components/dashboard/ConversationMap";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          C2C Listening Intelligence
        </h1>
        <p className="mt-1 text-gray-500">
          Community conversations from across the North, structured into evidence for change.
        </p>
      </div>

      <Suspense fallback={<LoadingSkeleton className="h-32" />}>
        <StatsCards />
      </Suspense>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={<LoadingSkeleton className="h-96" />}>
          <ConversationMap />
        </Suspense>
        <Suspense fallback={<LoadingSkeleton className="h-96" />}>
          <ThemeBreakdown />
        </Suspense>
      </div>

      <Suspense fallback={<LoadingSkeleton className="h-48" />}>
        <SentimentOverview />
      </Suspense>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={<LoadingSkeleton className="h-64" />}>
          <RecentConversations />
        </Suspense>
        <Suspense fallback={<LoadingSkeleton className="h-64" />}>
          <QuoteLibrary />
        </Suspense>
      </div>
    </div>
  );
}
