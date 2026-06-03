"use client";

import type { Banner, Category, Product, Settings } from "@/types/models";

import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export async function listCategories() {
  const supabase = createSupabaseBrowserClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data as Category[];
}

export async function listProducts(params?: {
  categoryId?: string;
  search?: string;
  onlyAvailable?: boolean;
  sort?: "featured" | "price_asc" | "price_desc" | "newest";
}) {
  const supabase = createSupabaseBrowserClient();
  let q = supabase.from("products").select("*");

  if (params?.categoryId) q = q.eq("category_id", params.categoryId);
  if (params?.onlyAvailable) q = q.eq("available", true);
  if (params?.search) q = q.ilike("title", `%${params.search}%`);

  switch (params?.sort) {
    case "featured":
      q = q.order("featured", { ascending: false }).order("created_at", {
        ascending: false,
      });
      break;
    case "price_asc":
      q = q.order("price", { ascending: true });
      break;
    case "price_desc":
      q = q.order("price", { ascending: false });
      break;
    case "newest":
    default:
      q = q.order("created_at", { ascending: false });
  }

  const { data, error } = await q;
  if (error) throw error;
  return data as Product[];
}

export async function getProductBySlug(slug: string) {
  const supabase = createSupabaseBrowserClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) throw error;
  return data as Product;
}

export async function listActiveBanners() {
  const supabase = createSupabaseBrowserClient();
  const { data, error } = await supabase
    .from("banners")
    .select("*")
    .eq("active", true);
  if (error) throw error;
  return data as Banner[];
}

export async function listBannersAll() {
  const supabase = createSupabaseBrowserClient();
  const { data, error } = await supabase
    .from("banners")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as Banner[];
}

export async function getSettings() {
  const supabase = createSupabaseBrowserClient();
  const { data, error } = await supabase.from("settings").select("*").single();
  if (error) throw error;
  return data as Settings;
}

// Admin CRUD
export async function upsertCategory(input: Partial<Category> & Pick<Category, "name" | "slug">) {
  const supabase = createSupabaseBrowserClient();
  const { data, error } = await supabase
    .from("categories")
    .upsert(input)
    .select("*")
    .single();
  if (error) throw error;
  return data as Category;
}

export async function deleteCategory(id: string) {
  const supabase = createSupabaseBrowserClient();
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) throw error;
}

export async function upsertProduct(
  input: Partial<Product> &
    Pick<Product, "title" | "slug" | "category_id" | "price">,
) {
  const supabase = createSupabaseBrowserClient();
  const { data, error } = await supabase
    .from("products")
    .upsert(input)
    .select("*")
    .single();
  if (error) throw error;
  return data as Product;
}

export async function deleteProduct(id: string) {
  const supabase = createSupabaseBrowserClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
}

export async function upsertBanner(input: Partial<Banner> & Pick<Banner, "title" | "image">) {
  const supabase = createSupabaseBrowserClient();
  const { data, error } = await supabase
    .from("banners")
    .upsert(input)
    .select("*")
    .single();
  if (error) throw error;
  return data as Banner;
}

export async function deleteBanner(id: string) {
  const supabase = createSupabaseBrowserClient();
  const { error } = await supabase.from("banners").delete().eq("id", id);
  if (error) throw error;
}

export async function updateSettings(input: Partial<Settings>) {
  const supabase = createSupabaseBrowserClient();
  const { data, error } = await supabase
    .from("settings")
    .update(input)
    .eq("id", 1)
    .select("*")
    .single();
  if (error) throw error;
  return data as Settings;
}

