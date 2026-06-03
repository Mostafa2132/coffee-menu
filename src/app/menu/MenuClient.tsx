"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { FiFilter, FiSearch, FiSliders, FiShoppingCart } from "react-icons/fi";
import { useCategories, useProducts } from "@/hooks/queries";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";
import { ProductCard } from "@/components/menu/ProductCard";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { addItem, openCart } from "@/features/cart/cartSlice";
import { CartDrawer } from "@/components/menu/CartDrawer";
import gsap from "gsap";

export function MenuClient() {
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
  const [onlyAvailable, setOnlyAvailable] = useState(true);
  const [sort, setSort] = useState<"featured" | "newest" | "price_asc" | "price_desc">("featured");
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const categories = useCategories();
  const products = useProducts({ categoryId, search, onlyAvailable, sort });
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  const categoryName = useMemo(() => {
    const found = categories.data?.find((c) => c.id === categoryId);
    return found?.name ?? "كل المشروبات";
  }, [categories.data, categoryId]);

  const headerRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Initial Load Animations
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(headerRef.current, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
      .fromTo(pillsRef.current?.children || [], { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power2.out" }, "-=0.4");
  }, []);

  // Grid Stagger Animation on data change
  useEffect(() => {
    if (products.data && gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.08, ease: "back.out(1.2)" }
      );
    }
  }, [products.data]);

  return (
    <div className="mt-8 mb-24 max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
      {/* Floating Cart Button */}
      {cartItems.length > 0 && (
        <button
          onClick={() => dispatch(openCart())}
          className="fixed bottom-8 left-8 z-40 bg-coffee-600 text-white w-16 h-16 rounded-full shadow-2xl shadow-coffee-600/40 flex items-center justify-center hover:scale-110 hover:bg-coffee-500 transition-all border border-coffee-400/50"
        >
          <FiShoppingCart size={24} />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center border-2 border-background">
            {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
          </span>
        </button>
      )}

      <CartDrawer />

      {/* Header & Controls */}
      <div 
        ref={headerRef}
        className="glass-panel p-6 rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row gap-5 items-center justify-between"
      >
        <div className="relative w-full md:w-[400px]">
          <div className="absolute right-5 top-1/2 -translate-y-1/2 text-coffee-400">
            <FiSearch size={22} />
          </div>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث عن مشروبك المفضل..."
            className="pr-14 h-14 rounded-full bg-black/40 border-white/10 focus:border-coffee-400 focus:ring-coffee-400/30 text-lg transition-all placeholder:text-muted/60"
          />
        </div>

        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          <Button
            type="button"
            variant="soft"
            className={`rounded-full h-14 px-6 text-base font-bold transition-all duration-300 border ${onlyAvailable ? "bg-coffee-600 text-white border-coffee-500 shadow-lg shadow-coffee-600/30" : "bg-black/40 text-muted border-white/10 hover:bg-black/60 hover:text-white"}`}
            onClick={() => setOnlyAvailable((v) => !v)}
          >
            <FiFilter className="ml-2" />
            {onlyAvailable ? "المتاح فقط" : "إظهار الكل"}
          </Button>

          <div className="relative flex-1 md:flex-none">
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-coffee-400">
              <FiSliders size={20} />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="h-14 w-full md:w-auto rounded-full border border-white/10 bg-black/40 px-6 pr-12 text-base font-bold shadow-sm backdrop-blur focus-visible:outline-none focus-visible:border-coffee-400 appearance-none cursor-pointer hover:bg-black/60 transition-colors text-foreground"
            >
              <option value="featured">المميز</option>
              <option value="newest">الأحدث</option>
              <option value="price_asc">السعر: من الأقل</option>
              <option value="price_desc">السعر: من الأعلى</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div 
        ref={pillsRef}
        className="mt-10 flex flex-wrap items-center justify-center gap-3"
      >
        <button
          type="button"
          onClick={() => setCategoryId(undefined)}
          className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coffee-400 transition-transform hover:scale-105 active:scale-95"
        >
          <Badge className={`px-6 py-3 text-base font-bold rounded-full transition-all duration-300 ${categoryId === undefined ? "bg-coffee-500 text-white border-transparent shadow-lg shadow-coffee-500/40" : "glass-panel text-muted hover:text-white"}`}>
            الكل
          </Badge>
        </button>

        {categories.isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-28 rounded-full bg-white/5" />
            ))
          : categories.data?.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategoryId(c.id)}
                className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coffee-400 transition-transform hover:scale-105 active:scale-95"
              >
                <Badge
                  className={`px-6 py-3 text-base font-bold rounded-full transition-all duration-300 ${
                    categoryId === c.id
                      ? "bg-coffee-500 text-white border-transparent shadow-lg shadow-coffee-500/40"
                      : "glass-panel text-muted hover:text-white"
                  }`}
                >
                  {c.name}
                </Badge>
              </button>
            ))}
      </div>

      {/* Results Header */}
      <div className="mt-16 flex items-center justify-between border-b border-white/10 pb-4">
        <h2 className="text-3xl font-extrabold text-foreground drop-shadow-lg flex items-center gap-3">
          <span className="w-2 h-8 bg-coffee-500 rounded-full inline-block"></span>
          {categoryName}
        </h2>
        {products.data ? (
          <span className="text-coffee-300 text-sm font-bold glass-panel px-4 py-2 rounded-full shadow-md">
            {products.data.length} منتجات
          </span>
        ) : null}
      </div>

      {/* Product Grid */}
      <div ref={gridRef} className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div 
                key={`skeleton-${i}`}
                className="rounded-[2rem] overflow-hidden glass-panel h-full min-h-[350px]"
              >
                <Skeleton className="h-[200px] w-full bg-white/5 rounded-t-[2rem]" />
                <div className="p-6">
                  <Skeleton className="h-6 w-2/3 mb-4 bg-white/10" />
                  <Skeleton className="h-4 w-full mb-2 bg-white/5" />
                  <Skeleton className="h-4 w-4/5 mb-6 bg-white/5" />
                  <Skeleton className="h-10 w-1/3 rounded-full bg-white/10" />
                </div>
              </div>
            ))
          : products.data?.map((p) => (
              <div key={p.id}>
                <ProductCard product={p} onSelect={() => setSelectedProduct(p)} />
              </div>
            ))}
      </div>

      {products.data?.length === 0 && !products.isLoading && (
        <div className="mt-20 text-center py-20 glass-panel rounded-[3rem]">
          <div className="text-6xl mb-6 opacity-80">🫗</div>
          <h3 className="text-3xl font-bold text-foreground mb-4">لا توجد منتجات</h3>
          <p className="text-muted text-lg">لم نتمكن من العثور على مشروبات تطابق بحثك. جرب تصنيفاً آخر!</p>
        </div>
      )}

      {products.isError ? (
        <div className="mt-10 rounded-[2rem] glass-panel border-red-500/30 bg-red-900/20 p-8 text-center text-red-200 shadow-lg">
          <p className="font-bold text-2xl mb-2">عذراً، حدث خطأ في الاتصال.</p>
          <p className="text-base opacity-80">يرجى التأكد من اتصالك بقاعدة البيانات (Supabase) والمحاولة مرة أخرى.</p>
        </div>
      ) : null}

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}

function ProductModal({ product, onClose }: { product: any | null, onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const [selectedSize, setSelectedSize] = useState("وسط");

  useEffect(() => {
    if (product) {
      setSelectedSize("وسط");
      document.body.style.overflow = "hidden";
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, display: "flex", ease: "power2.out" });
      gsap.fromTo(modalRef.current, 
        { y: 50, scale: 0.9, opacity: 0 }, 
        { y: 0, scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.2)", delay: 0.1 }
      );
    } else {
      document.body.style.overflow = "";
      if (modalRef.current) {
        gsap.to(modalRef.current, { y: 20, scale: 0.95, opacity: 0, duration: 0.3, ease: "power2.in" });
      }
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, display: "none", ease: "power2.in", delay: 0.1 });
    }
  }, [product]);

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(addItem({
      product_id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      size: selectedSize
    }));
    onClose();
    dispatch(openCart());
  };

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md hidden items-center justify-center p-4 opacity-0"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div 
        ref={modalRef}
        className="glass-panel w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row relative opacity-0"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/40 text-white rounded-full flex items-center justify-center hover:bg-red-500 transition-colors backdrop-blur-md"
        >
          ✕
        </button>

        {product && (
          <>
            <div className="w-full md:w-1/2 aspect-square md:aspect-auto relative bg-coffee-900/50">
              <img src={product.image || ""} alt={product.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent md:hidden" />
            </div>
            
            <div className="w-full md:w-1/2 p-8 flex flex-col relative z-10 bg-background/80">
              <h2 className="text-3xl font-bold text-foreground mb-2">{product.title}</h2>
              <div className="text-xl font-bold text-coffee-400 mb-4">{product.price.toFixed(2)} ج.م</div>
              
              <p className="text-muted leading-relaxed mb-8 flex-1">
                {product.description || "استمتع بمذاق القهوة الغني والمحضر بعناية فائقة ليرضي ذوقك الرفيع."}
              </p>

              <div className="space-y-4 mb-8">
                <div>
                  <h4 className="text-sm font-bold text-foreground mb-2">الحجم</h4>
                  <div className="flex gap-2">
                    {["صغير", "وسط", "كبير"].map((size) => (
                      <button 
                        key={size} 
                        onClick={() => setSelectedSize(size)}
                        className={`flex-1 py-2 rounded-xl text-sm font-bold border transition-colors ${selectedSize === size ? "bg-coffee-600 text-white border-coffee-500" : "bg-black/20 text-muted border-white/10 hover:bg-black/40"}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleAddToCart}
                className="w-full rounded-2xl h-14 text-lg font-bold bg-white text-black hover:bg-coffee-100 transition-colors"
              >
                إضافة للسلة
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

