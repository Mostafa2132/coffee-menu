import { DashboardProductsClient } from "./productsClient";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

export const metadata = {
  title: "المنتجات",
};

export default function DashboardProductsPage() {
  return (
    <DashboardShell
      title="المنتجات"
      subtitle="إضافة، تعديل، حذف المنتجات وتغيير التوفر."
    >
      <DashboardProductsClient />
    </DashboardShell>
  );
}

