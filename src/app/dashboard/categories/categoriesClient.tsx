"use client";

import * as yup from "yup";

import { useDeleteCategory, useUpsertCategory } from "@/hooks/mutations";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { Category } from "@/types/models";
import { Input } from "@/components/ui/Input";
import toast from "react-hot-toast";
import { useCategories } from "@/hooks/queries";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  name: yup.string().required().min(2),
  slug: yup
    .string()
    .required()
    .matches(/^[a-z0-9-]+$/, "استخدم أحرفاً صغيرة وأرقاماً وشرطات فقط"),
});

type FormValues = yup.InferType<typeof schema>;

export function DashboardCategoriesClient() {
  const q = useCategories();
  const upsert = useUpsertCategory();
  const del = useDeleteCategory();

  const [editing, setEditing] = useState<Category | null>(null);

  const defaults = useMemo<FormValues>(
    () => ({
      name: editing?.name ?? "",
      slug: editing?.slug ?? "",
    }),
    [editing],
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    values: defaults,
  });

  return (
    <div className="gap-6 grid lg:grid-cols-[420px_1fr]">
      <div className="bg-black/20 p-5 border border-[color:var(--color-card-border)] rounded-3xl">
        <div className="font-semibold text-sm">
          {editing ? "تعديل تصنيف" : "إضافة تصنيف"}
        </div>
        <form
          className="space-y-3 mt-4"
          onSubmit={handleSubmit(async (values) => {
            try {
              await upsert.mutateAsync(
                editing ? { id: editing.id, ...values } : values,
              );
              toast.success(editing ? "تم تحديث التصنيف" : "تمت إضافة التصنيف");
              setEditing(null);
              reset({ name: "", slug: "" });
            } catch (e: any) {
              toast.error(e?.message ?? "فشل الحفظ");
            }
          })}
        >
          <div>
            <div className="font-medium text-sm">Name</div>
            <Input className="mt-2" placeholder="Hot Coffee" {...register("name")} />
            {errors.name?.message ? (
              <div className="mt-1 text-red-600 text-xs">
                {errors.name.message}
              </div>
            ) : null}
          </div>

          <div>
            <div className="font-medium text-sm">Slug</div>
            <Input className="mt-2" placeholder="hot-coffee" {...register("slug")} />
            {errors.slug?.message ? (
              <div className="mt-1 text-red-600 text-xs">
                {errors.slug.message}
              </div>
            ) : null}
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Button type="submit" size="sm" disabled={isSubmitting}>
              {editing ? "حفظ التغييرات" : "إضافة"}
            </Button>
            {editing ? (
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => {
                  setEditing(null);
                  reset({ name: "", slug: "" });
                }}
              >
                إلغاء
              </Button>
            ) : null}
          </div>
        </form>
      </div>

      <div className="bg-black/20 p-5 border border-[color:var(--color-card-border)] rounded-3xl">
        <div className="flex justify-between items-center gap-3">
          <div className="font-semibold text-sm">جميع التصنيفات</div>
          {q.data ? (
            <Badge className="bg-coffee-200/70 text-coffee-900">
              {q.data.length}
            </Badge>
          ) : null}
        </div>

        {q.isError ? (
          <div className="mt-4 text-red-700 dark:text-red-200 text-sm">
            تعذر تحميل التصنيفات. تحقق من إعداد Supabase.
          </div>
        ) : null}

        <div className="gap-2 grid mt-4">
          {(q.data ?? []).map((c) => (
            <div
              key={c.id}
              className="flex justify-between items-center gap-3 bg-[color:var(--color-card)] px-4 py-3 border border-[color:var(--color-card-border)] rounded-2xl"
            >
              <div>
                <div className="font-semibold text-sm">{c.name}</div>
                <div className="mt-1 text-[color:var(--color-muted)] text-xs">
                  /{c.slug}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => setEditing(c)}
                >
                  تعديل
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="danger"
                  disabled={del.isPending}
                  onClick={async () => {
                    if (!confirm(`حذف "${c.name}"؟`)) return;
                    try {
                      await del.mutateAsync(c.id);
                      toast.success("تم حذف التصنيف");
                      if (editing?.id === c.id) setEditing(null);
                    } catch (e: any) {
                      toast.error(e?.message ?? "فشل الحذف");
                    }
                  }}
                >
                  حذف
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

