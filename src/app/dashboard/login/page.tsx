"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

type FormValues = yup.InferType<typeof schema>;

export default function DashboardLoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/dashboard";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });

  return (
    <div className="min-h-full">
      <SiteHeader />
      <main className="mx-auto w-full max-w-lg px-4 pb-10 pt-10">
        <Card className="p-6">
          <div className="text-xl font-semibold">Admin Login</div>
          <p className="mt-1 text-sm text-[color:var(--color-muted)]">
            Sign in to manage products, categories, banners, and settings.
          </p>

          <form
            className="mt-6 space-y-4"
            onSubmit={handleSubmit(async (values) => {
              const supabase = createSupabaseBrowserClient();
              const { error } = await supabase.auth.signInWithPassword(values);
              if (error) {
                toast.error(error.message);
                return;
              }
              toast.success("Welcome back");
              router.push(next);
              router.refresh();
            })}
          >
            <div>
              <div className="text-sm font-medium">Email</div>
              <Input
                className="mt-2"
                placeholder="admin@cafe.com"
                autoComplete="email"
                {...register("email")}
              />
              {errors.email?.message && (
                <div className="mt-1 text-xs text-red-600">
                  {errors.email.message}
                </div>
              )}
            </div>

            <div>
              <div className="text-sm font-medium">Password</div>
              <Input
                className="mt-2"
                placeholder="••••••••"
                type="password"
                autoComplete="current-password"
                {...register("password")}
              />
              {errors.password?.message && (
                <div className="mt-1 text-xs text-red-600">
                  {errors.password.message}
                </div>
              )}
            </div>

            <Button className="w-full" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
}

