import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { OrdersClient } from "./ordersClient";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Order } from "@/types/models";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function OrdersPage() {
  const supabase = await createSupabaseServerClient();
  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <DashboardShell 
      title="الطلبات الحية" 
      subtitle="استقبل وإدارة الطلبات الواردة لحظياً من العملاء."
    >
      <OrdersClient initialOrders={(orders as Order[]) || []} />
    </DashboardShell>
  );
}
