import { DashboardSettingsClient } from "./settingsClient";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

export const metadata = {
  title: "الإعدادات",
};

export default function DashboardSettingsPage() {
  return (
    <DashboardShell
      title="الإعدادات"
      subtitle="معلومات المتجر، الروابط الاجتماعية، ساعات العمل، معلومات الاتصال."
    >
      <DashboardSettingsClient />
    </DashboardShell>
  );
}

