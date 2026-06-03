"use client";

import * as yup from "yup";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Skeleton } from "@/components/ui/Skeleton";
import { seedSampleData } from "@/lib/seedData";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSettings } from "@/hooks/queries";
import { useUpdateSettings } from "@/hooks/mutations";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  store_name:    yup.string().required().min(2),
  phone:         yup.string().nullable().optional(),
  address:       yup.string().nullable().optional(),
  facebook:      yup.string().nullable().optional(),
  instagram:     yup.string().nullable().optional(),
  tiktok:        yup.string().nullable().optional(),
  opening_hours: yup.string().nullable().optional(),
});

type FormValues = yup.InferType<typeof schema>;

export function DashboardSettingsClient() {
  const q      = useSettings();
  const update = useUpdateSettings();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      store_name:    "",
      phone:         "",
      address:       "",
      facebook:      "",
      instagram:     "",
      tiktok:        "",
      opening_hours: "",
    },
  });

  useEffect(() => {
    if (q.data) {
      reset({
        store_name:    q.data.store_name,
        phone:         q.data.phone         ?? "",
        address:       q.data.address       ?? "",
        facebook:      q.data.facebook      ?? "",
        instagram:     q.data.instagram     ?? "",
        tiktok:        q.data.tiktok        ?? "",
        opening_hours: q.data.opening_hours ?? "",
      });
    }
  }, [q.data, reset]);

  if (q.isLoading) {
    return (
      <div className="gap-4 grid md:grid-cols-2">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="md:col-span-2 h-14" />
        <Skeleton className="md:col-span-2 h-14" />
      </div>
    );
  }

  if (q.isError) {
    return (
      <div className="bg-red-500/10 p-4 border border-red-500/30 rounded-3xl text-red-700 dark:text-red-200 text-sm">
        تعذّر تحميل الإعدادات. تأكد من وجود جدول <code>settings</code> ويحتوي
        على صف واحد على الأقل.
      </div>
    );
  }

  return (
    <form
      className="gap-4 grid md:grid-cols-2"
      onSubmit={handleSubmit(async (values) => {
        try {
          await update.mutateAsync(values);
          toast.success("تم حفظ الإعدادات");
        } catch (e: any) {
          toast.error(e?.message ?? "فشل الحفظ");
        }
      })}
    >
      {/* ─── معلومات المتجر ─────────────────────────────────── */}
      <Field label="اسم المتجر" error={errors.store_name?.message}>
        <Input {...register("store_name")} />
      </Field>
      <Field label="رقم الهاتف">
        <Input placeholder="+966 5X XXX XXXX" {...register("phone")} />
      </Field>
      <Field label="العنوان" className="md:col-span-2">
        <Input placeholder="الشارع، المدينة" {...register("address")} />
      </Field>
      <Field label="ساعات العمل" className="md:col-span-2">
        <Input
          placeholder="السبت – الخميس: 8:00 ص — 12:00 م"
          {...register("opening_hours")}
        />
      </Field>

      {/* ─── روابط التواصل الاجتماعي ────────────────────────── */}
      <div className="md:col-span-2 pt-2 font-semibold text-sm border-t border-[color:var(--color-card-border)] mt-2">
        روابط التواصل الاجتماعي
      </div>
      <Field label="فيسبوك">
        <Input placeholder="https://facebook.com/..." {...register("facebook")} />
      </Field>
      <Field label="إنستغرام">
        <Input
          placeholder="https://instagram.com/..."
          {...register("instagram")}
        />
      </Field>
      <Field label="تيك توك" className="md:col-span-2">
        <Input
          placeholder="https://tiktok.com/@..."
          {...register("tiktok")}
        />
      </Field>

      {/* ─── أزرار ───────────────────────────────────────────── */}
      <div className="md:col-span-2 flex items-center gap-2 pt-2">
        <Button size="sm" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "جاري الحفظ..." : "حفظ الإعدادات"}
        </Button>
        <Button
          size="sm"
          type="button"
          variant="soft"
          onClick={async () => {
            try {
              await seedSampleData();
              toast.success("تم إضافة البيانات الافتراضية بنجاح");
            } catch (e: any) {
              toast.error(e?.message ?? "فشل إضافة البيانات");
            }
          }}
        >
          إضافة بيانات افتراضية
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  children,
  error,
  className,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="font-medium text-sm">{label}</div>
      <div className="mt-2">{children}</div>
      {error ? (
        <div className="mt-1 text-red-600 text-xs">{error}</div>
      ) : null}
    </div>
  );
}
