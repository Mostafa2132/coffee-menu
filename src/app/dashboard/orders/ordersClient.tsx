"use client";

import { useState, useEffect } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import type { Order } from "@/types/models";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FiCheck, FiClock, FiTrash2, FiVolume2 } from "react-icons/fi";
import toast from "react-hot-toast";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";

const STATUS_MAP = {
  pending: { label: "جديد", color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
  processing: { label: "جاري التحضير", color: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
  completed: { label: "مكتمل", color: "bg-green-500/10 text-green-500 border-green-500/20" },
  cancelled: { label: "ملغي", color: "bg-red-500/10 text-red-500 border-red-500/20" },
};

export function OrdersClient({ initialOrders }: { initialOrders: Order[] }) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const supabase = createSupabaseBrowserClient();

  useEffect(() => {
    const audio = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");

    const channel = supabase
      .channel("realtime-orders")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "orders" },
        (payload) => {
          const newOrder = payload.new as Order;
          setOrders((prev) => [newOrder, ...prev]);
          toast.success(`طلب جديد من طاولة ${newOrder.table_number}!`, { duration: 5000, icon: "🔔" });
          audio.play().catch(() => {});
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "orders" },
        (payload) => {
          setOrders((prev) =>
            prev.map((o) => (o.id === payload.new.id ? (payload.new as Order) : o))
          );
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "orders" },
        (payload) => {
          setOrders((prev) => prev.filter((o) => o.id !== payload.old.id));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  const updateStatus = async (id: string, status: Order["status"]) => {
    const { error } = await supabase.from("orders").update({ status }).eq("id", id);
    if (error) toast.error("حدث خطأ أثناء تحديث حالة الطلب");
    else toast.success("تم تحديث حالة الطلب");
  };

  const deleteOrder = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا الطلب بشكل نهائي؟")) return;
    const { error } = await supabase.from("orders").delete().eq("id", id);
    if (error) toast.error("حدث خطأ أثناء الحذف");
    else toast.success("تم حذف الطلب");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">إدارة الطلبات</h2>
        <div className="flex items-center gap-2 text-sm text-green-500 font-bold bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          متصل (Real-time)
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-background/50 rounded-3xl border border-card-border">
          <FiVolume2 className="mx-auto text-4xl text-muted opacity-50 mb-4" />
          <p className="text-muted text-lg">لا توجد طلبات حتى الآن. بانتظار أول طلب...</p>
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {orders.map((order) => (
            <div key={order.id} className="bg-background/80 backdrop-blur-md rounded-2xl border border-card-border p-5 flex flex-col shadow-sm">
              <div className="flex justify-between items-start mb-4 pb-4 border-b border-white/5">
                <div>
                  <div className="text-sm text-muted mb-1">طاولة رقم</div>
                  <div className="text-3xl font-black text-coffee-400">{order.table_number}</div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge className={STATUS_MAP[order.status].color + " border backdrop-blur-sm px-3 py-1"}>
                    {STATUS_MAP[order.status].label}
                  </Badge>
                  <div className="text-xs text-muted flex items-center gap-1">
                    <FiClock />
                    {formatDistanceToNow(new Date(order.created_at), { addSuffix: true, locale: ar })}
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-3 mb-6">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm bg-black/20 p-2.5 rounded-xl">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-coffee-300 bg-coffee-900/50 w-6 h-6 flex items-center justify-center rounded-full">
                        {item.quantity}x
                      </span>
                      <span>{item.title} {item.size && <span className="text-muted">({item.size})</span>}</span>
                    </div>
                    <span className="font-bold">{(item.price * item.quantity).toFixed(2)} ج.م</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="text-lg font-bold">
                  الإجمالي: <span className="text-coffee-400">{order.total_price.toFixed(2)} ج.م</span>
                </div>
                
                <div className="flex items-center gap-2">
                  {order.status === "pending" && (
                    <Button size="sm" onClick={() => updateStatus(order.id, "processing")} className="bg-amber-600 hover:bg-amber-500 text-white">
                      تحضير
                    </Button>
                  )}
                  {order.status === "processing" && (
                    <Button size="sm" onClick={() => updateStatus(order.id, "completed")} className="bg-green-600 hover:bg-green-500 text-white">
                      <FiCheck className="mr-1" /> اكتمل
                    </Button>
                  )}
                  <Button size="sm" variant="soft" onClick={() => deleteOrder(order.id)} className="text-red-400 hover:bg-red-500/20 px-2">
                    <FiTrash2 />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
