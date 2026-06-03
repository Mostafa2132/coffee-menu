"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiMapPin, FiStar, FiTag, FiArrowRight } from "react-icons/fi";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function HomeSections() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate Info Cards with skew and stagger
      gsap.fromTo(
        ".info-card",
        { y: 80, opacity: 0, rotateX: 20 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          transformPerspective: 1000,
          scrollTrigger: {
            trigger: ".info-grid",
            start: "top 85%",
          },
        }
      );

      // Animate Premium Feature Area with advanced parallax
      const featureTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".feature-grid",
          start: "top 80%",
          end: "bottom top",
          scrub: 1,
        }
      });
      
      // Entrance animation
      gsap.fromTo(
        ".feature-card-main",
        { scale: 0.9, opacity: 0, y: 50 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "elastic.out(1, 0.8)",
          scrollTrigger: {
            trigger: ".feature-grid",
            start: "top 75%",
          },
        }
      );
      
      gsap.fromTo(
        ".feature-card-side",
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".feature-grid",
            start: "top 75%",
          },
        }
      );

      // Parallax on scroll
      featureTl.to(".feature-card-main", { y: -50, ease: "none" }, 0);
      featureTl.to(".feature-card-side", { y: -80, ease: "none" }, 0);

      // Animate Map Section
      gsap.fromTo(
        ".map-section",
        { scale: 0.95, opacity: 0, filter: "blur(10px)" },
        {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".map-section",
            start: "top 85%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="mx-auto max-w-6xl px-6 lg:px-12 pb-32 relative z-10">
      <div className="info-grid mt-20 grid gap-6 md:grid-cols-3">
        <Info
          icon={<FiStar size={24} />}
          title="أفضل اختيارات اليوم"
          desc="مشروبات ترند + مقترحات حسب الموسم محضرة بعناية من أجود حبوب البن."
          className="info-card"
        />
        <Info
          icon={<FiTag size={24} />}
          title="عروض مميزة"
          desc="باقات قهوة + مخبوزات بأسعار أفضل وتجربة لا تُنسى مع كل رشفة."
          className="info-card"
        />
        <Info
          icon={<FiMapPin size={24} />}
          title="قريب منك"
          desc="اكتشف فروعنا وساعات العمل بسهولة لتجربة القهوة الأقرب إليك."
          className="info-card"
        />
      </div>

      <div className="feature-grid mt-32 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <div className="feature-card-main group relative">
          <div className="absolute inset-0 bg-gradient-to-br from-coffee-500/20 via-transparent to-coffee-300/10 blur-3xl rounded-[2.5rem] pointer-events-none transition-opacity duration-700 opacity-50 group-hover:opacity-100" />
          <Card className="relative overflow-hidden p-8 lg:p-12 h-full bg-card/60 backdrop-blur-xl border border-card-border rounded-[2.5rem] shadow-2xl hover:shadow-coffee-900/15 transition-all duration-500">
            <div className="absolute top-0 right-0 p-8 pointer-events-none opacity-5 dark:opacity-[0.02] transform scale-150 translate-x-10 -translate-y-10 group-hover:rotate-12 transition-transform duration-1000">
              <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 3H6C4.89543 3 4 3.89543 4 5V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V5C20 3.89543 19.1046 3 18 3ZM12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12C17 14.7614 14.7614 17 12 17Z" />
              </svg>
            </div>
            
            <div className="relative z-10">
              <span className="inline-block px-5 py-2 rounded-full bg-coffee-100 dark:bg-coffee-900/40 text-coffee-800 dark:text-coffee-200 text-xs font-bold uppercase tracking-widest mb-8 border border-coffee-200 dark:border-coffee-800/50 shadow-sm">
                تجربة منيو تفاعلية
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6 leading-tight">
                اكتشف المذاق <span className="text-transparent bg-clip-text bg-gradient-to-r from-coffee-600 to-coffee-400">الحقيقي</span>
              </h2>
              <p className="text-lg leading-relaxed text-muted mb-10 max-w-lg">
                جرّب صفحة المنيو التفاعلية الخاصة بنا. تصفح الفلاتر، أضف مفضلاتك، واستمتع بتجربة طلب سلسة وأنيقة تليق بكوب قهوتك.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/menu">
                  <Button size="lg" className="bg-coffee-600 hover:bg-coffee-700 text-white rounded-full px-8 h-14 text-lg shadow-lg shadow-coffee-600/20 hover:scale-105 transition-transform w-full sm:w-auto">
                    تصفح المنيو <FiArrowRight className="ml-2" />
                  </Button>
                </Link>
                <Link href="/qr">
                  <Button size="lg" variant="soft" className="rounded-full px-8 h-14 text-lg w-full sm:w-auto bg-background/50 hover:bg-coffee-50 dark:hover:bg-coffee-900/30 border border-card-border">
                    توليد QR للطاولات
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>

        <div className="feature-card-side flex flex-col gap-6 pt-10 lg:pt-0">
          <Card className="p-8 h-full bg-card/60 backdrop-blur-xl border border-card-border rounded-[2.5rem] shadow-xl flex flex-col hover:border-coffee-400/30 transition-colors duration-300">
            <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
              <FiStar className="text-amber-500 fill-amber-500" /> آراء العملاء
            </h3>
            <p className="text-base text-muted mb-8">
              “أفضل تجربة قهوة رقمية وواقعية.”
            </p>
            <div className="space-y-4 flex-1 flex flex-col justify-center relative">
              {/* Decorative line */}
              <div className="absolute left-6 top-4 bottom-4 w-px bg-gradient-to-b from-coffee-200 via-coffee-300 to-transparent dark:from-coffee-800 dark:via-coffee-700" />
              <MiniTestimonial name="Sara M." text="لاتيه الكراميل هنا يصنع يومي، والتطبيق سلس جداً!" />
              <MiniTestimonial name="Omar A." text="واجهة المنيو سهلة جداً والفلاتر ممتازة." />
              <MiniTestimonial name="Nour S." text="المكان المفضل لي للعمل والقهوة." />
            </div>
          </Card>
        </div>
      </div>

      <div className="map-section mt-32">
        <Card className="overflow-hidden bg-card/60 backdrop-blur-xl border border-card-border rounded-[2.5rem] shadow-2xl">
          <div className="grid lg:grid-cols-[1fr_1.5fr]">
            <div className="p-8 lg:p-14 flex flex-col justify-center">
              <h3 className="text-3xl font-bold text-foreground mb-6">زورنا في فرعنا</h3>
              <p className="text-lg text-muted mb-10 leading-relaxed">
                نحن في انتظارك لتقديم أفضل كوب قهوة. يمكنك ربط خرائط جوجل من لوحة التحكم لتوجيه عملائك مباشرة إليك.
              </p>
              <div>
                <Link href="/dashboard/settings">
                  <Button size="lg" variant="soft" className="rounded-full px-8 bg-background/80 hover:bg-coffee-50 dark:hover:bg-coffee-900/40 border border-card-border hover:scale-105 transition-transform">
                    إعدادات الموقع (للمدير)
                  </Button>
                </Link>
              </div>
            </div>
            <div className="min-h-[350px] lg:min-h-[450px] relative bg-coffee-100/50 dark:bg-coffee-900/20 overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-coffee-300/30 to-transparent pointer-events-none group-hover:scale-110 transition-transform duration-1000" />
              
              {/* Abstract map representation */}
              <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
              
              <div className="grid h-full place-items-center text-center p-6 relative z-10">
                <div className="space-y-5">
                  <div className="w-20 h-20 mx-auto bg-coffee-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-coffee-600/40 animate-bounce" style={{ animationDuration: '3s' }}>
                    <FiMapPin size={32} />
                  </div>
                  <div className="bg-background/80 backdrop-blur-md px-6 py-3 rounded-full border border-card-border shadow-sm">
                    <p className="text-sm font-bold text-foreground">
                      المكان مخصص لخريطة Google
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function Info({
  icon,
  title,
  desc,
  className
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  className?: string;
}) {
  return (
    <Card className={`p-8 lg:p-10 bg-card/60 backdrop-blur-xl border border-card-border rounded-[2.5rem] shadow-lg hover:shadow-xl hover:shadow-coffee-900/10 transition-all duration-500 group ${className}`}>
      <div className="w-16 h-16 rounded-[1.5rem] bg-coffee-100 dark:bg-coffee-900/60 flex items-center justify-center text-coffee-600 dark:text-coffee-300 mb-8 group-hover:scale-110 group-hover:-rotate-6 group-hover:bg-coffee-600 group-hover:text-white transition-all duration-500 shadow-sm">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-foreground mb-4">{title}</h3>
      <p className="text-base leading-relaxed text-muted">
        {desc}
      </p>
    </Card>
  );
}

function MiniTestimonial({ name, text }: { name: string; text: string }) {
  return (
    <div className="relative z-10 ml-6 pl-6 py-2 transition-transform hover:translate-x-2 duration-300">
      <div className="absolute -left-[33px] top-3 w-4 h-4 rounded-full bg-background border-4 border-coffee-400 dark:border-coffee-500 shadow-sm" />
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-full bg-coffee-200 dark:bg-coffee-800 flex items-center justify-center text-xs font-bold text-coffee-700 dark:text-coffee-300 shadow-sm">
          {name.charAt(0)}
        </div>
        <div className="text-sm font-bold text-foreground">{name}</div>
      </div>
      <p className="text-sm text-muted leading-relaxed">{text}</p>
    </div>
  );
}

