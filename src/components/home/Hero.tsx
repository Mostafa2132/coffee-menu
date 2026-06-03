"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { FiArrowRight, FiSearch } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export function Hero({ className }: { className?: string }) {
  const t = useTranslations();
  const rootRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const beansContainerRef = useRef<HTMLDivElement>(null);
  const leavesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Initial Load Animation Timeline
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        headlineRef.current,
        { y: 40, opacity: 0, scale: 0.95, rotationX: 15 },
        { y: 0, opacity: 1, scale: 1, rotationX: 0, duration: 1.4, transformPerspective: 800 }
      )
        .fromTo(
          subRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          "-=0.9"
        )
        .fromTo(
          ctasRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.7"
        )
        .fromTo(
          cardRef.current,
          { x: 50, opacity: 0, rotationY: -15, scale: 0.9 },
          { x: 0, opacity: 1, rotationY: 0, scale: 1, duration: 1.4, transformPerspective: 1200 },
          "-=1.1"
        );

      // 2. Floating Beans & Leaves Background Animation
      const animateFloating = (selector: string, speedMult: number) => {
        gsap.utils.toArray<HTMLElement>(selector).forEach((el, i) => {
          gsap.to(el, {
            y: `-=${Math.random() * 40 + 30}`,
            x: `+=${Math.random() * 30 - 15}`,
            rotation: `+=${Math.random() * 90 - 45}`,
            duration: (Math.random() * 4 + 4) * speedMult,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: i * 0.3,
          });
        });
      };
      
      animateFloating(".bg-bean", 1);
      animateFloating(".bg-leaf", 1.5);

      // 3. Mouse Parallax Effect on entire section
      const onMouseMove = (e: MouseEvent) => {
        if (!rootRef.current) return;
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 20;
        const yPos = (clientY / window.innerHeight - 0.5) * 20;

        gsap.to(cardRef.current, {
          x: xPos * 2,
          y: yPos * 2,
          rotationY: xPos * 0.8,
          rotationX: -yPos * 0.8,
          duration: 1.5,
          ease: "power2.out",
          transformPerspective: 1000,
        });

        gsap.to(beansContainerRef.current, {
          x: -xPos * 3,
          y: -yPos * 3,
          duration: 2,
          ease: "power2.out",
        });
        
        gsap.to(leavesContainerRef.current, {
          x: -xPos * 4,
          y: -yPos * 4,
          duration: 2.5,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", onMouseMove);

      // 4. Scroll Parallax & Fade
      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        animation: gsap.timeline()
          .to(rootRef.current, { y: 150, opacity: 0.3, ease: "none" }, 0)
          .to(cardRef.current, { y: 250, rotationZ: 5, ease: "none" }, 0),
      });

      return () => {
        window.removeEventListener("mousemove", onMouseMove);
      };
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className={cn("relative min-h-[95vh] overflow-hidden flex items-center pt-20 pb-10", className)}>
      {/* Dynamic Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-coffee-200/40 via-background to-background dark:from-coffee-900/30 dark:via-background dark:to-background pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-coffee-400/10 via-transparent to-transparent pointer-events-none" />

      {/* Floating Background Beans */}
      <div ref={beansContainerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={`bean-${i}`}
            className="bg-bean absolute opacity-30 dark:opacity-20 mix-blend-multiply dark:mix-blend-screen"
            style={{
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 90}%`,
              width: `${Math.random() * 40 + 20}px`,
              height: `${Math.random() * 60 + 30}px`,
              borderRadius: "50%",
              backgroundColor: "var(--coffee-500)",
              filter: "blur(4px)",
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          >
            <div className="absolute inset-0 w-1 h-full bg-background/50 mx-auto rounded-full" />
          </div>
        ))}
      </div>
      
      {/* Floating Leaves */}
      <div ref={leavesContainerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(5)].map((_, i) => (
          <svg
            key={`leaf-${i}`}
            className="bg-leaf absolute fill-emerald-600/10 dark:fill-emerald-400/10 drop-shadow-lg"
            style={{
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 90}%`,
              width: `${Math.random() * 60 + 40}px`,
              transform: `rotate(${Math.random() * 360}deg)`,
              filter: "blur(2px)",
            }}
            viewBox="0 0 100 100"
          >
            <path d="M50,0 C80,30 90,60 50,100 C10,60 20,30 50,0 Z" />
            <path d="M50,0 Q50,50 50,100" stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="none" />
          </svg>
        ))}
      </div>

      <div className="container relative z-10 mx-auto grid lg:grid-cols-2 gap-12 px-6 lg:px-12 items-center">
        {/* Left Content Area */}
        <div className="flex flex-col justify-center max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-coffee-100 dark:bg-coffee-900/40 text-coffee-800 dark:text-coffee-200 text-sm font-medium mb-8 w-max border border-coffee-200 dark:border-coffee-800/50 shadow-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
            <span className="w-2 h-2 rounded-full bg-coffee-500 animate-pulse" />
            تذوق القهوة الفاخرة
          </div>
          
          <h1
            ref={headlineRef}
            className="text-5xl lg:text-[5rem] font-bold tracking-tight text-foreground leading-[1.1]"
          >
            استمتع بـ <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-coffee-600 to-coffee-400 dark:from-coffee-300 dark:to-coffee-500 relative inline-block mt-2">
              الكوب المثالي
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-coffee-400/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0,5 Q50,10 100,5" stroke="currentColor" strokeWidth="3" fill="none" />
              </svg>
            </span>
          </h1>
          
          <p
            ref={subRef}
            className="mt-8 text-lg lg:text-xl text-muted leading-relaxed max-w-lg"
          >
            {t("home.heroSubtitle") || "اكتشف مجموعتنا المختارة بعناية من القهوة المختصة، المخبوزات الهشة، والمشروبات المنعشة المصممة لتعديل مزاجك."}
          </p>

          <div ref={ctasRef} className="mt-10 flex flex-wrap gap-4 items-center">
            <Link href="/menu">
              <Button size="lg" className="bg-coffee-600 hover:bg-coffee-700 text-white shadow-lg shadow-coffee-600/30 rounded-full px-8 h-14 text-lg transition-all hover:scale-105 hover:shadow-xl hover:shadow-coffee-600/40">
                {t("common.viewMenu")} <FiArrowRight className="ml-2" />
              </Button>
            </Link>
            <Link href="/menu">
              <Button size="lg" variant="soft" className="rounded-full px-8 h-14 text-lg bg-card/80 backdrop-blur-md border border-card-border hover:bg-coffee-50 dark:hover:bg-coffee-900/50 transition-colors">
                <FiSearch className="mr-2" /> {t("common.search")}
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-14 flex items-center gap-6 text-sm font-medium text-muted">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full bg-coffee-200 dark:bg-coffee-800 border-2 border-background flex items-center justify-center overflow-hidden shadow-sm">
                  <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${i+10}&backgroundColor=transparent`} alt="avatar" />
                </div>
              ))}
            </div>
            <div>
              <div className="flex text-amber-500 text-lg mb-1">★★★★★</div>
              <span className="opacity-80">أكثر من 10,000 عميل سعيد</span>
            </div>
          </div>
        </div>

        {/* Right Interactive Card Area */}
        <div className="relative hidden lg:block" ref={cardRef}>
          {/* Glowing backdrop */}
          <div className="absolute inset-0 bg-gradient-to-tr from-coffee-400/20 to-transparent blur-[80px] rounded-full" />
          
          {/* Main Glass Card */}
          <div className="relative bg-card/40 dark:bg-card/60 backdrop-blur-2xl border border-card-border/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] rounded-[3rem] p-8 overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 opacity-50 pointer-events-none rounded-[3rem]" />
            
            <div className="relative flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-foreground">المشروبات المميزة</h3>
              <span className="px-4 py-1.5 bg-coffee-500/10 text-coffee-600 dark:text-coffee-300 rounded-full text-xs font-bold tracking-wider">الأكثر طلباً</span>
            </div>

            <div className="space-y-4 relative z-10">
              <PickCard title="كولد برو" desc="مستخلص على البارد لمدة ١٢ ساعة" price="32.00 ج.م" delay={0} img="https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=100&h=100&fit=crop" />
              <PickCard title="لاتيه كراميل" desc="إسبريسو غني مع كراميل مملح" price="28.00 ج.م" delay={0.1} img="https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=100&h=100&fit=crop" />
              <PickCard title="ماتشا ياباني" desc="ماتشا احتفالي نقي بالحليب" price="35.00 ج.م" delay={0.2} img="https://images.unsplash.com/photo-1536514072410-5019a3c69182?w=100&h=100&fit=crop" />
            </div>
            
            {/* Decorative Card Elements */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-coffee-300/30 dark:bg-coffee-600/20 blur-3xl rounded-full pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}

function PickCard({ title, desc, price, delay, img }: { title: string; desc: string; price: string; delay: number; img: string }) {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(elRef.current, 
      { opacity: 0, x: 30, scale: 0.95 },
      { opacity: 1, x: 0, scale: 1, duration: 1, delay: 1.5 + delay, ease: "elastic.out(1, 0.7)", scrollTrigger: elRef.current }
    );
  }, [delay]);

  return (
    <div 
      ref={elRef}
      className="group relative flex items-center gap-5 p-4 rounded-3xl bg-background/50 hover:bg-background/90 dark:bg-black/20 dark:hover:bg-black/50 border border-transparent hover:border-card-border shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-coffee-500/0 via-coffee-500/0 to-coffee-500/0 group-hover:from-coffee-500/5 group-hover:to-transparent transition-all duration-500" />
      
      <div className="relative w-16 h-16 rounded-2xl bg-coffee-100 dark:bg-coffee-900/50 border border-coffee-200 dark:border-coffee-800 flex-shrink-0 flex items-center justify-center overflow-hidden">
         <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      </div>
      
      <div className="flex-1 relative z-10">
        <h4 className="font-bold text-foreground group-hover:text-coffee-600 dark:group-hover:text-coffee-300 transition-colors text-lg">{title}</h4>
        <p className="text-sm text-muted line-clamp-1">{desc}</p>
      </div>
      
      <div className="relative z-10 font-bold text-lg text-coffee-700 dark:text-coffee-200 bg-coffee-100/50 dark:bg-coffee-900/30 px-3 py-1 rounded-full border border-coffee-200/50 dark:border-coffee-800/50">
        {price}
      </div>
    </div>
  );
}

