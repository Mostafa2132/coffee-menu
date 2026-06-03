"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { closeCart, removeItem, updateQuantity, clearCart } from "@/features/cart/cartSlice";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { FiX, FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export function CartDrawer() {
  const { items, isOpen } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const overlayRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const [tableNumber, setTableNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, display: "block", ease: "power2.out" });
      gsap.fromTo(drawerRef.current, 
        { x: "100%" }, 
        { x: "0%", duration: 0.5, ease: "power3.out" }
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(drawerRef.current, { x: "100%", duration: 0.4, ease: "power3.in" });
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.4, display: "none", ease: "power2.in" });
      // Reset state if closed
      if (success) {
        setTimeout(() => setSuccess(false), 500);
      }
    }
  }, [isOpen, success]);

  const handleSubmit = async () => {
    if (!tableNumber || items.length === 0) return;
    setIsSubmitting(true);
    const supabase = createSupabaseBrowserClient();
    
    const { error } = await supabase.from("orders").insert({
      table_number: tableNumber,
      total_price: totalPrice,
      items: items,
      status: "pending"
    });

    setIsSubmitting(false);

    if (!error) {
      setSuccess(true);
      dispatch(clearCart());
      setTimeout(() => {
        dispatch(closeCart());
      }, 3000);
    } else {
      alert("حدث خطأ أثناء إرسال الطلب، يرجى المحاولة مرة أخرى.");
    }
  };

  return (
    <>
      <div 
        ref={overlayRef} 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 hidden opacity-0"
        onClick={() => dispatch(closeCart())}
      />
      <div 
        ref={drawerRef}
        className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-background border-l border-white/10 z-50 flex flex-col shadow-2xl translate-x-full"
      >
        <div className="p-6 border-b border-white/10 flex justify-between items-center glass-panel sticky top-0 z-10">
          <h2 className="text-2xl font-bold">سلة المشتريات</h2>
          <button 
            onClick={() => dispatch(closeCart())}
            className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 relative">
          {success ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">تم إرسال الطلب بنجاح!</h3>
              <p className="text-muted">جاري تحضير طلبك، سيصلك للطاولة رقم {tableNumber} قريباً.</p>
            </div>
          ) : items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-muted opacity-60">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-xl font-bold">السلة فارغة</p>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-black/20 border border-white/5 relative">
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                    <p className="text-sm text-muted mb-3">الحجم: {item.size}</p>
                    <div className="font-bold text-coffee-400">{item.price.toFixed(2)} ج.م</div>
                  </div>
                  
                  <div className="flex flex-col items-end justify-between">
                    <button 
                      onClick={() => dispatch(removeItem({ product_id: item.product_id, size: item.size }))}
                      className="text-red-400 hover:text-red-300 p-2"
                    >
                      <FiTrash2 size={18} />
                    </button>
                    
                    <div className="flex items-center gap-3 bg-black/40 rounded-full px-2 py-1">
                      <button 
                        onClick={() => item.quantity > 1 && dispatch(updateQuantity({ product_id: item.product_id, size: item.size, quantity: item.quantity - 1 }))}
                        className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10"
                      >
                        <FiMinus size={14} />
                      </button>
                      <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => dispatch(updateQuantity({ product_id: item.product_id, size: item.size, quantity: item.quantity + 1 }))}
                        className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 text-coffee-400"
                      >
                        <FiPlus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {!success && items.length > 0 && (
          <div className="p-6 border-t border-white/10 glass-panel mt-auto">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg text-muted">الإجمالي</span>
              <span className="text-2xl font-bold text-foreground">{totalPrice.toFixed(2)} ج.م</span>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-bold text-foreground mb-2">رقم الطاولة (مطلوب)</label>
              <Input
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                placeholder="أدخل رقم طاولتك هنا..."
                className="w-full h-14 bg-black/40 border-white/20 rounded-2xl focus:border-coffee-400 text-center text-lg font-bold"
                required
              />
            </div>

            <Button 
              onClick={handleSubmit} 
              disabled={isSubmitting || !tableNumber.trim()}
              className="w-full h-14 text-lg font-bold rounded-2xl bg-coffee-600 hover:bg-coffee-500 text-white shadow-xl shadow-coffee-600/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "جاري الإرسال..." : "تأكيد الطلب"}
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
