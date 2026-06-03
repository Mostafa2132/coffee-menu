import { DashboardShell } from "@/components/dashboard/DashboardShell";

export const metadata = {
  title: "التحليلات",
};

export default function DashboardAnalyticsPage() {
  return (
    <DashboardShell
      title="التحليلات"
      subtitle="المنتجات الأكثر مشاهدة، التصنيفات الشائعة، والإجماليات."
    >
      <div className="text-[color:var(--color-muted)] text-sm">
        الخطوة التالية: تتبع المشاهدات + عرض الرسوم البيانية (Recharts) من جداول Supabase.
      </div>
    </DashboardShell>
  );
}

