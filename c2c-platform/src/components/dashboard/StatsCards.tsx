import { getDashboardStats } from "@/lib/data";
import { MessageSquare, MapPin, Lightbulb, Heart, Users } from "lucide-react";

export async function StatsCards() {
  const stats = await getDashboardStats();

  const cards = [
    {
      label: "Conversations",
      value: stats.totalConversations,
      icon: MessageSquare,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Locations",
      value: stats.totalLocations,
      icon: MapPin,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      label: "Insights Extracted",
      value: stats.totalInsights,
      icon: Lightbulb,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Avg Belonging",
      value: `${stats.avgBelonging} / 5`,
      icon: Heart,
      color: "text-rose-600",
      bg: "bg-rose-50",
    },
    {
      label: "Avg Influence",
      value: `${stats.avgInfluence} / 5`,
      icon: Users,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {cards.map(({ label, value, icon: Icon, color, bg }) => (
        <div
          key={label}
          className="rounded-xl border border-gray-200 bg-white p-5 flex flex-col gap-3"
        >
          <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center`}>
            <Icon className={`w-5 h-5 ${color}`} />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-sm text-gray-500">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
