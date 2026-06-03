"use client";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { FiTrendingUp, FiTrendingDown, FiDollarSign, FiUsers, FiShoppingBag, FiCoffee } from "react-icons/fi";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const revenueData = [
  { name: 'Jan', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Feb', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Mar', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Apr', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'May', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Jun', total: Math.floor(Math.random() * 5000) + 1000 },
];

const categoryData = [
  { name: 'القهوة', value: 400 },
  { name: 'القهوة الباردة', value: 300 },
  { name: 'الحلويات', value: 300 },
  { name: 'المعجنات', value: 200 },
];

const recentOrders = [
  { id: "ORD-7352", customer: "أحمد محمد", amount: "150 ج.م", status: "مكتمل", date: "منذ 10 دقائق" },
  { id: "ORD-7351", customer: "سارة خالد", amount: "280 ج.م", status: "قيد التجهيز", date: "منذ 45 دقيقة" },
  { id: "ORD-7350", customer: "عمر عبدالله", amount: "85 ج.م", status: "مكتمل", date: "منذ ساعتين" },
  { id: "ORD-7349", customer: "نورة صالح", amount: "320 ج.م", status: "ملغي", date: "منذ 5 ساعات" },
];

export default function DashboardHomePage() {
  return (
    <DashboardShell
      title="لوحة التحكم"
      subtitle="نظرة عامة على الأداء والمبيعات (بيانات تجريبية)."
    >
      {/* Top Stats Row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard 
          title="إجمالي المبيعات" 
          value="45,231 ج.م" 
          icon={<FiDollarSign className="text-emerald-500" />}
          trend="+20.1%" 
          trendUp={true} 
        />
        <StatCard 
          title="الطلبات" 
          value="+2350" 
          icon={<FiShoppingBag className="text-blue-500" />}
          trend="+15%" 
          trendUp={true} 
        />
        <StatCard 
          title="العملاء النشطين" 
          value="+12,234" 
          icon={<FiUsers className="text-amber-500" />}
          trend="-4%" 
          trendUp={false} 
        />
        <StatCard 
          title="المنتجات المباعة" 
          value="+573" 
          icon={<FiCoffee className="text-coffee-500" />}
          trend="+201 منذ الأمس" 
          trendUp={true} 
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr] mb-8">
        {/* Main Chart */}
        <div className="bg-background/50 border border-card-border rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg">نظرة عامة على المبيعات</h3>
            <select className="bg-card border border-card-border rounded-xl px-3 py-1.5 text-sm focus:outline-none">
              <option>آخر 6 أشهر</option>
              <option>هذا العام</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d97706" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#d97706" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-card-border)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'var(--color-muted)', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--color-muted)', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--color-card)', borderRadius: '12px', border: '1px solid var(--color-card-border)', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  itemStyle={{ color: 'var(--color-foreground)' }}
                />
                <Area type="monotone" dataKey="total" stroke="#d97706" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Secondary Chart / Categories */}
        <div className="bg-background/50 border border-card-border rounded-3xl p-6 shadow-sm flex flex-col">
          <h3 className="font-bold text-lg mb-6">المبيعات حسب التصنيف</h3>
          <div className="h-[200px] w-full flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical" margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="var(--color-card-border)" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: 'var(--color-muted)', fontSize: 12}} width={80} />
                <Tooltip 
                  cursor={{fill: 'var(--color-card-border)', opacity: 0.4}}
                  contentStyle={{ backgroundColor: 'var(--color-card)', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                />
                <Bar dataKey="value" fill="#d97706" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-background/50 border border-card-border rounded-3xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-card-border flex items-center justify-between">
          <h3 className="font-bold text-lg">أحدث الطلبات</h3>
          <button className="text-sm text-coffee-600 hover:text-coffee-700 font-medium">عرض الكل</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-right">
            <thead className="bg-card/50 text-muted border-b border-card-border uppercase">
              <tr>
                <th className="px-6 py-4 font-semibold">رقم الطلب</th>
                <th className="px-6 py-4 font-semibold">العميل</th>
                <th className="px-6 py-4 font-semibold">المبلغ</th>
                <th className="px-6 py-4 font-semibold">الحالة</th>
                <th className="px-6 py-4 font-semibold">الوقت</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, i) => (
                <tr key={order.id} className="border-b border-card-border/50 hover:bg-card/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{order.id}</td>
                  <td className="px-6 py-4">{order.customer}</td>
                  <td className="px-6 py-4 font-bold">{order.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      order.status === 'مكتمل' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                      order.status === 'ملغي' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                      'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardShell>
  );
}

function StatCard({ title, value, icon, trend, trendUp }: { title: string; value: string; icon: React.ReactNode; trend: string; trendUp: boolean }) {
  return (
    <div className="bg-background/50 border border-card-border rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
      <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-br from-transparent to-card-border/40 rounded-bl-full pointer-events-none" />
      
      <div className="flex justify-between items-start mb-4">
        <div className="text-muted text-sm font-medium">{title}</div>
        <div className="w-10 h-10 rounded-2xl bg-card border border-card-border flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
          {icon}
        </div>
      </div>
      
      <div className="font-bold text-3xl mb-2">{value}</div>
      
      <div className={`flex items-center text-sm font-medium ${trendUp ? 'text-emerald-500' : 'text-red-500'}`}>
        {trendUp ? <FiTrendingUp className="ml-1" /> : <FiTrendingDown className="ml-1" />}
        {trend}
      </div>
    </div>
  );
}


