import { DashboardCategoriesClient } from "./categoriesClient";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

export const metadata = {
  title: "التصنيفات",
};

export default function DashboardCategoriesPage() {
  return (
    <DashboardShell
      title="التصنيفات"
      subtitle="إدارة التصنيفات وإعادة ترتيب القائمة."
    >
      <DashboardCategoriesClient />
    </DashboardShell>
  );
}

