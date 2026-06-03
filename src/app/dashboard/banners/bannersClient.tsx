"use client";

import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAllBanners } from "@/hooks/queries";
import { useDeleteBanner, useUpsertBanner } from "@/hooks/mutations";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import type { Banner } from "@/types/models";

const schema = yup.object({
  title: yup.string().required().min(2),
  subtitle: yup.string().default(""),
  image: yup.string().required().url(),
  active: yup.boolean().default(true),
});

type FormValues = yup.InferType<typeof schema>;

export function DashboardBannersClient() {
  const q = useAllBanners();
  const upsert = useUpsertBanner();
  const del = useDeleteBanner();

  const [editing, setEditing] = useState<Banner | null>(null);

  const defaults = useMemo<FormValues>(
    () => ({
      title: editing?.title ?? "",
      subtitle: editing?.subtitle ?? "",
      image: editing?.image ?? "",
      active: editing?.active ?? true,
    }),
    [editing],
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: yupResolver(schema), values: defaults });

  return (
    <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
      <div className="rounded-3xl border border-[color:var(--color-card-border)] bg-black/20 p-5">
        <div className="text-sm font-semibold">
          {editing ? "Edit banner" : "Add banner"}
        </div>
        <form
          className="mt-4 space-y-3"
          onSubmit={handleSubmit(async (values) => {
            try {
              await upsert.mutateAsync(
                editing ? { id: editing.id, ...values } : values,
              );
              toast.success(editing ? "Banner updated" : "Banner added");
              setEditing(null);
              reset({ title: "", subtitle: "", image: "", active: true });
            } catch (e: any) {
              toast.error(e?.message ?? "Failed to save");
            }
          })}
        >
          <div>
            <div className="text-sm font-medium">Title</div>
            <Input className="mt-2" placeholder="Spring Offer" {...register("title")} />
            {errors.title?.message ? (
              <div className="mt-1 text-xs text-red-600">
                {errors.title.message}
              </div>
            ) : null}
          </div>

          <div>
            <div className="text-sm font-medium">Subtitle</div>
            <Input className="mt-2" placeholder="Buy 1 get 1 50% off" {...register("subtitle")} />
          </div>

          <div>
            <div className="text-sm font-medium">Image URL</div>
            <Input className="mt-2" placeholder="https://..." {...register("image")} />
            {errors.image?.message ? (
              <div className="mt-1 text-xs text-red-600">
                {errors.image.message}
              </div>
            ) : null}
          </div>

          <label className="inline-flex items-center gap-2 pt-2 text-sm">
            <input type="checkbox" {...register("active")} />
            Active
          </label>

          <div className="flex items-center gap-2 pt-2">
            <Button type="submit" size="sm" disabled={isSubmitting}>
              {editing ? "Save changes" : "Add"}
            </Button>
            {editing ? (
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => {
                  setEditing(null);
                  reset({ title: "", subtitle: "", image: "", active: true });
                }}
              >
                Cancel
              </Button>
            ) : null}
          </div>
        </form>
      </div>

      <div className="rounded-3xl border border-[color:var(--color-card-border)] bg-black/20 p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm font-semibold">All banners</div>
          {q.data ? (
            <Badge className="bg-coffee-200/70 text-coffee-900">
              {q.data.length}
            </Badge>
          ) : null}
        </div>

        {q.isError ? (
          <div className="mt-4 text-sm text-red-700 dark:text-red-200">
            Could not load banners.
          </div>
        ) : null}

        <div className="mt-4 grid gap-2">
          {(q.data ?? []).map((b) => (
            <div
              key={b.id}
              className="flex flex-col gap-3 rounded-2xl border border-[color:var(--color-card-border)] bg-[color:var(--color-card)] px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="text-sm font-semibold">{b.title}</div>
                  {b.active ? (
                    <Badge className="bg-coffee-200/70 text-coffee-900">
                      Active
                    </Badge>
                  ) : (
                    <Badge className="bg-red-500/15 text-red-700 dark:text-red-200">
                      Inactive
                    </Badge>
                  )}
                </div>
                {b.subtitle ? (
                  <div className="mt-1 text-xs text-[color:var(--color-muted)] line-clamp-1">
                    {b.subtitle}
                  </div>
                ) : null}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => setEditing(b)}
                >
                  Edit
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="danger"
                  disabled={del.isPending}
                  onClick={async () => {
                    if (!confirm(`Delete "${b.title}"?`)) return;
                    try {
                      await del.mutateAsync(b.id);
                      toast.success("Banner deleted");
                      if (editing?.id === b.id) setEditing(null);
                    } catch (e: any) {
                      toast.error(e?.message ?? "Failed to delete");
                    }
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

