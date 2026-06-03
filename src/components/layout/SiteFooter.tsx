"use client";

import { FiClock, FiFacebook, FiInstagram, FiMapPin, FiPhone } from "react-icons/fi";

import { FiArrowUpRight } from "react-icons/fi";
import Link from "next/link";
import { SiTiktok } from "react-icons/si";
import { useSettings } from "@/hooks/queries";

export function SiteFooter() {
  const { data: settings } = useSettings();

  const storeName = settings?.store_name || "Caffè Aurelia";
  const phone = settings?.phone;
  const address = settings?.address;
  const instagram = settings?.instagram;
  const facebook = settings?.facebook;
  const tiktok = settings?.tiktok;
  const openingHours = settings?.opening_hours;

  const hasSocial = instagram || facebook || tiktok;

  return (
    <footer className="mt-auto">
      <div className="mx-auto px-4 pt-8 pb-6 max-w-6xl">

        {/* Main grid */}
        <div className="gap-8 grid md:grid-cols-3 bg-[color:var(--color-card)] p-8 border border-[color:var(--color-card-border)] rounded-3xl">

          {/* Brand */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex justify-center items-center bg-[#2C1A0E] rounded-xl w-9 h-9 shrink-0">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path d="M10 3C10 3 6 6 6 10.5C6 13.538 7.79 16 10 16C12.21 16 14 13.538 14 10.5C14 6 10 3 10 3Z" fill="#C8A97A"/>
                  <path d="M10 6C10 6 8 8 8 10.5C8 12.157 8.895 13.5 10 13.5" stroke="#fff" strokeWidth="1" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="font-semibold text-base">{storeName}</span>
            </div>

            <p className="text-[color:var(--color-muted)] text-sm leading-relaxed" dir="rtl">
              قهوة ومخبوزات بأجواء عصرية دافئة — تجربة فريدة في كل زيارة
            </p>

            {openingHours && (
              <div className="inline-flex items-center gap-2 bg-[color:var(--color-muted)]/10 mt-4 px-3 py-1.5 border border-[color:var(--color-card-border)] rounded-full w-fit text-[color:var(--color-muted)] text-xs">
                <FiClock className="shrink-0" />
                <span>{openingHours}</span>
              </div>
            )}
          </div>

          {/* Contact */}
          <div className="flex flex-col">
            <p className="mb-4 font-semibold text-[10px] text-[color:var(--color-muted)] uppercase tracking-widest">
              تواصل معنا
            </p>

            <div className="flex flex-col gap-3">
              {phone && (
                <div className="flex items-start gap-3" dir="rtl">
                  <div className="flex justify-center items-center bg-[color:var(--color-muted)]/10 rounded-lg w-8 h-8 shrink-0">
                    <FiPhone className="text-[color:var(--color-muted)]" size={14} />
                  </div>
                  <div>
                    <p className="mb-0.5 text-[11px] text-[color:var(--color-muted)]/60">الهاتف</p>
                    <a href={`tel:${phone}`} className="text-[color:var(--color-foreground)] text-sm hover:underline">
                      {phone}
                    </a>
                  </div>
                </div>
              )}

              {address && (
                <div className="flex items-start gap-3" dir="rtl">
                  <div className="flex justify-center items-center bg-[color:var(--color-muted)]/10 mt-0.5 rounded-lg w-8 h-8 shrink-0">
                    <FiMapPin className="text-[color:var(--color-muted)]" size={14} />
                  </div>
                  <div>
                    <p className="mb-0.5 text-[11px] text-[color:var(--color-muted)]/60">العنوان</p>
                    <p className="text-[color:var(--color-foreground)] text-sm">{address}</p>
                  </div>
                </div>
              )}

              {!phone && !address && (
                <p className="text-[color:var(--color-muted)]/50 text-xs">
                  لم يتم إضافة بيانات التواصل بعد
                </p>
              )}
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col">
            <p className="mb-4 font-semibold text-[10px] text-[color:var(--color-muted)] uppercase tracking-widest">
              تابعنا
            </p>

            <div className="flex flex-col gap-2">
              {instagram && (
                <Link
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:bg-[color:var(--color-muted)]/5 px-3 py-2 border border-[color:var(--color-card-border)] rounded-xl text-[color:var(--color-foreground)] text-sm transition"
                >
                  <div className="flex justify-center items-center bg-pink-100 dark:bg-pink-950/40 rounded-md w-7 h-7 shrink-0">
                    <FiInstagram className="text-pink-600 dark:text-pink-400" size={13} />
                  </div>
                  <span>Instagram</span>
                  <FiArrowUpRight className="ml-auto text-[color:var(--color-muted)]" size={13} />
                </Link>
              )}

              {facebook && (
                <Link
                  href={facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:bg-[color:var(--color-muted)]/5 px-3 py-2 border border-[color:var(--color-card-border)] rounded-xl text-[color:var(--color-foreground)] text-sm transition"
                >
                  <div className="flex justify-center items-center bg-blue-100 dark:bg-blue-950/40 rounded-md w-7 h-7 shrink-0">
                    <FiFacebook className="text-blue-600 dark:text-blue-400" size={13} />
                  </div>
                  <span>Facebook</span>
                  <FiArrowUpRight className="ml-auto text-[color:var(--color-muted)]" size={13} />
                </Link>
              )}

              {tiktok && (
                <Link
                  href={tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:bg-[color:var(--color-muted)]/5 px-3 py-2 border border-[color:var(--color-card-border)] rounded-xl text-[color:var(--color-foreground)] text-sm transition"
                >
                  <div className="flex justify-center items-center bg-purple-100 dark:bg-purple-950/40 rounded-md w-7 h-7 shrink-0">
                    <SiTiktok className="text-purple-600 dark:text-purple-400" size={12} />
                  </div>
                  <span>TikTok</span>
                  <FiArrowUpRight className="ml-auto text-[color:var(--color-muted)]" size={13} />
                </Link>
              )}

              {!hasSocial && (
                <p className="text-[color:var(--color-muted)]/50 text-xs">
                  لم يتم إضافة روابط التواصل بعد
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex sm:flex-row flex-col justify-between items-center gap-2 mt-5 px-1">
          <p className="text-[color:var(--color-muted)] text-xs">
            © {new Date().getFullYear()} {storeName} · جميع الحقوق محفوظة
          </p>
          <p className="text-[color:var(--color-muted)] text-xs">
            made with ❤ by{" "}
            <a
              href="https://www.linkedin.com/in/mostafa-m-ebrahem-81120a288/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Mostafa M. Ebrahem
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}