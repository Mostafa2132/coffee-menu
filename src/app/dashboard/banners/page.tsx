import { DashboardBannersClient } from "./bannersClient";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

export const metadata = {
  title: "اللافتات",
};

export default function DashboardBannersPage() {
  return (
    <DashboardShell
      title="اللافتات"
      subtitle="التحكم في لافتات البطل والشرائح الترويجية."
    >
      <DashboardBannersClient />
    </DashboardShell>
  );
}

