"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { FiHeart, FiCoffee } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/models";
import { cn } from "@/lib/cn";
import { toggleFavorite } from "@/features/favorites/favoritesSlice";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

function ProductImage({ src, alt }: { src: string | null; alt: string }) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (!src || hasError) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-coffee-900/30 text-coffee-400">
        <FiCoffee className="h-12 w-12 opacity-50 mb-2" />
        <span className="text-xs font-medium opacity-50">لا توجد صورة</span>
      </div>
    );
  }

  return (
    <>
      {!isLoaded && (
        <div className="absolute inset-0 bg-coffee-800/50 animate-pulse" />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        className={cn(
          "object-cover transition-all duration-1000 ease-out",
          isLoaded ? "opacity-100 scale-100 group-hover:scale-110" : "opacity-0 scale-110"
        )}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const favIds = useAppSelector((s) => s.favorites.productIds);
  const isFav = favIds.includes(product.id);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onMouseEnter = () => {
      gsap.to(card, { y: -10, scale: 1.02, duration: 0.4, ease: "back.out(1.5)" });
    };
    const onMouseLeave = () => {
      gsap.to(card, { y: 0, scale: 1, duration: 0.4, ease: "power2.out" });
    };

    card.addEventListener("mouseenter", onMouseEnter);
    card.addEventListener("mouseleave", onMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", onMouseEnter);
      card.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div ref={cardRef} className="h-full">
      <Card className="group overflow-hidden h-full flex flex-col glass-panel hover:border-coffee-400/50 transition-colors duration-500 shadow-lg hover:shadow-coffee-500/20 rounded-[2rem]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-[2rem]">
          <ProductImage src={product.image} alt={product.title} />

          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            <Badge
              className={cn(
                "shadow-lg backdrop-blur-md border px-3 py-1",
                product.available
                  ? "bg-black/40 text-coffee-100 border-white/10"
                  : "bg-red-900/80 text-white border-red-500/50"
              )}
            >
              {product.available ? "متاح" : "غير متاح"}
            </Badge>
            {product.featured && (
              <Badge className="bg-coffee-500/80 text-white border-coffee-300/50 shadow-lg backdrop-blur-md px-3 py-1 w-fit">
                مميز
              </Badge>
            )}
          </div>

          <button
            type="button"
            aria-label="Toggle favorite"
            onClick={(e) => {
              e.preventDefault();
              dispatch(toggleFavorite(product.id));
              // Small pop animation on click
              gsap.fromTo(e.currentTarget, 
                { scale: 0.8 }, 
                { scale: 1, duration: 0.4, ease: "back.out(2)" }
              );
            }}
            className={cn(
              "absolute top-4 right-4 z-10 grid place-items-center w-12 h-12 rounded-full backdrop-blur-xl border transition-all duration-300 shadow-lg",
              isFav 
                ? "bg-red-500/20 text-red-500 border-red-500/30 shadow-red-500/20" 
                : "bg-black/30 text-white/70 border-white/10 hover:bg-black/50 hover:text-white"
            )}
          >
            <FiHeart className={cn("text-xl transition-transform", isFav && "fill-current")} />
          </button>
        </div>

        <div className="p-6 flex flex-col flex-1 relative z-10 -mt-6 bg-gradient-to-b from-transparent to-background/50">
          <div className="flex justify-between items-start gap-4 mb-3">
            <Link href={`/product/${product.slug}`} className="group-hover:text-coffee-300 transition-colors">
              <h3 className="font-bold text-xl leading-tight text-foreground drop-shadow-md">
                {product.title}
              </h3>
            </Link>
            <div className="bg-coffee-900/80 backdrop-blur-md px-4 py-1.5 rounded-full font-bold text-coffee-100 text-sm shrink-0 shadow-lg border border-coffee-700/50">
              {product.price.toFixed(2)} ج.م
            </div>
          </div>
          
          {product.description && (
            <p className="mt-2 text-muted text-sm line-clamp-2 leading-relaxed flex-1 font-light">
              {product.description}
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}
