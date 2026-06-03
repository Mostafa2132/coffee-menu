"use client";

import * as yup from "yup";

import { useCategories, useProducts } from "@/hooks/queries";
import { useDeleteProduct, useUpsertProduct } from "@/hooks/mutations";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { Product } from "@/types/models";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  title: yup.string().required().min(2),
  slug: yup
    .string()
    .required()
    .matches(/^[a-z0-9-]+$/, "Use lowercase letters, numbers, and dashes only"),
  price: yup.number().typeError("السعر مطلوب").required().min(0),
  category_id: yup.string().required("التصنيف مطلوب"),
  available: yup.boolean().default(true),
  featured: yup.boolean().default(false),
});

type FormValues = yup.InferType<typeof schema>;

export function DashboardProductsClient() {
  const categories = useCategories();
  const products = useProducts({ sort: "newest", onlyAvailable: false });
  const upsert = useUpsertProduct();
  const del = useDeleteProduct();

  const [editing, setEditing] = useState<Product | null>(null);

  const defaults = useMemo<FormValues>(
    () => ({
      title: editing?.title ?? "",
      slug: editing?.slug ?? "",
      price: editing?.price ?? 0,
      category_id: editing?.category_id ?? "",
      available: editing?.available ?? true,
      featured: editing?.featured ?? false,
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

  const [isUploading, setIsUploading] = useState(false);
  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !editing) return;
    const file = e.target.files[0];
    
    try {
      setIsUploading(true);
      const { createSupabaseBrowserClient } = await import("@/lib/supabase/browser");
      const supabase = createSupabaseBrowserClient();
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${editing.id}-${Math.random()}.${fileExt}`;
      
      const { error: uploadError, data } = await supabase.storage
        .from('products')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('products')
        .getPublicUrl(fileName);

      const imageUrl = publicUrlData.publicUrl;

      // Update the product record with the image
      await upsert.mutateAsync({ ...editing, image: imageUrl });
      setEditing({ ...editing, image: imageUrl });
      toast.success("تم رفع الصورة بنجاح");
    } catch (error: any) {
      toast.error(error.message || "حدث خطأ أثناء رفع الصورة");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="gap-6 grid lg:grid-cols-[420px_1fr]">
      <div className="bg-black/20 p-5 border border-[color:var(--color-card-border)] rounded-3xl">
        <div className="font-semibold text-sm">
          {editing ? "تعديل منتج" : "إضافة منتج"}
        </div>

        <form
          className="space-y-3 mt-4"
          onSubmit={handleSubmit(async (values) => {
            try {
              await upsert.mutateAsync(
                editing ? { id: editing.id, ...values } : values,
              );
              toast.success(editing ? "تم تحديث المنتج" : "تمت إضافة المنتج");
              setEditing(null);
              reset({
                title: "",
                slug: "",
                price: 0,
                category_id: "",
                available: true,
                featured: false,
              });
            } catch (e: any) {
              toast.error(e?.message ?? "فشل الحفظ");
            }
          })}
        >
          <div>
            <div className="font-medium text-sm">العنوان</div>
            <Input className="mt-2" placeholder="Caramel Latte" {...register("title")} />
            {errors.title?.message ? (
              <div className="mt-1 text-red-600 text-xs">
                {errors.title.message}
              </div>
            ) : null}
          </div>

          <div>
            <div className="font-medium text-sm">الرابط المختصر</div>
            <Input className="mt-2" placeholder="caramel-latte" {...register("slug")} />
            {errors.slug?.message ? (
              <div className="mt-1 text-red-600 text-xs">
                {errors.slug.message}
              </div>
            ) : null}
          </div>

          <div className="gap-3 grid sm:grid-cols-2">
            <div>
              <div className="font-medium text-sm">السعر</div>
              <Input className="mt-2" inputMode="decimal" {...register("price")} />
              {errors.price?.message ? (
                <div className="mt-1 text-red-600 text-xs">
                  {errors.price.message}
                </div>
              ) : null}
            </div>

            <div>
              <div className="font-medium text-sm">التصنيف</div>
              <select
                className="bg-[color:var(--color-card)] shadow-[var(--shadow-card)] backdrop-blur mt-2 px-4 border border-[color:var(--color-card-border)] rounded-2xl focus-visible:outline-none focus-visible:ring-[color:var(--ring)] focus-visible:ring-2 w-full h-11 text-sm"
                {...register("category_id")}
              >
                <option value="">اختر…</option>
                {categories.isLoading ? (
                  <option value="">جاري التحميل...</option>
                ) : (categories.data ?? []).length === 0 ? (
                  <option value="" disabled>لا توجد تصنيفات متاحة</option>
                ) : (
                  (categories.data ?? []).map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))
                )}
              </select>
              {errors.category_id?.message ? (
                <div className="mt-1 text-red-600 text-xs">
                  {errors.category_id.message}
                </div>
              ) : null}
              {(categories.data ?? []).length === 0 && !categories.isLoading && (
                <div className="mt-2 text-[color:var(--color-muted)] text-xs">
                  Please create categories first in the Categories section
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 pt-2 text-sm">
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" {...register("available")} />
              متوفر
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" {...register("featured")} />
              مميز
            </label>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Button type="submit" size="sm" disabled={isSubmitting || isUploading}>
              {isUploading ? "جاري الرفع..." : editing ? "حفظ التغييرات" : "إضافة"}
            </Button>
            {editing ? (
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => {
                  setEditing(null);
                  reset({
                    title: "",
                    slug: "",
                    price: 0,
                    category_id: "",
                    available: true,
                    featured: false,
                  });
                }}
              >
                إلغاء
              </Button>
            ) : null}
          </div>
        </form>

        <div className="mt-8 border-t border-card-border pt-6">
          <div className="font-semibold text-sm mb-4">صورة المنتج</div>
          {editing ? (
            <div className="space-y-4">
              {editing.image && (
                <div className="w-32 h-32 rounded-2xl overflow-hidden border border-card-border bg-black/20">
                  <img src={editing.image} alt={editing.title} className="w-full h-full object-cover" />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUploading}
                className="block w-full text-sm text-muted file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-coffee-600 file:text-white hover:file:bg-coffee-500 cursor-pointer disabled:opacity-50"
              />
              <p className="text-xs text-muted">اختر صورة للمنتج ليتم رفعها وتحديثها فوراً.</p>
            </div>
          ) : (
            <div className="text-[color:var(--color-muted)] text-xs bg-black/20 p-4 rounded-xl border border-card-border/50">
              يرجى حفظ المنتج أولاً قبل محاولة رفع صورة له.
            </div>
          )}
        </div>
      </div>

      <div className="bg-black/20 p-5 border border-[color:var(--color-card-border)] rounded-3xl">
        <div className="flex justify-between items-center gap-3">
          <div className="font-semibold text-sm">جميع المنتجات</div>
          {products.data ? (
            <Badge className="bg-coffee-200/70 text-coffee-900">
              {products.data.length}
            </Badge>
          ) : null}
        </div>

        {products.isError ? (
          <div className="mt-4 text-red-700 dark:text-red-200 text-sm">
            تعذر تحميل المنتجات. تحقق من إعداد Supabase.
          </div>
        ) : null}

        <div className="gap-2 grid mt-4">
          {(products.data ?? []).map((p) => (
            <div
              key={p.id}
              className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-3 bg-[color:var(--color-card)] px-4 py-3 border border-[color:var(--color-card-border)] rounded-2xl"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="font-semibold text-sm">{p.title}</div>
                  {!p.available ? (
                    <Badge className="bg-red-500/15 text-red-700 dark:text-red-200">
                      غير متوفر
                    </Badge>
                  ) : null}
                  {p.featured ? (
                    <Badge className="bg-coffee-200/70 text-coffee-900">
                      مميز
                    </Badge>
                  ) : null}
                </div>
                <div className="mt-1 text-[color:var(--color-muted)] text-xs">
                  /product/{p.slug}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="bg-coffee-100/80 dark:bg-coffee-900/30 px-3 py-1 rounded-2xl font-semibold text-coffee-900 dark:text-coffee-100 text-sm">
                  {p.price.toFixed(2)} ج.م
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => setEditing(p)}
                >
                  تعديل
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="danger"
                  disabled={del.isPending}
                  onClick={async () => {
                    if (!confirm(`حذف "${p.title}"؟`)) return;
                    try {
                      await del.mutateAsync(p.id);
                      toast.success("تم حذف المنتج");
                      if (editing?.id === p.id) setEditing(null);
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

