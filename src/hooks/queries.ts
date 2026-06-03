import { useQuery } from "@tanstack/react-query";
import {
  getProductBySlug,
  getSettings,
  listActiveBanners,
  listBannersAll,
  listCategories,
  listProducts,
} from "@/services/menuApi";

export const queryKeys = {
  categories: ["categories"] as const,
  products: (args: unknown) => ["products", args] as const,
  product: (slug: string) => ["product", slug] as const,
  banners: ["banners"] as const,
  bannersAll: ["banners", "all"] as const,
  settings: ["settings"] as const,
};

export function useCategories() {
  return useQuery({ queryKey: queryKeys.categories, queryFn: listCategories });
}

export function useProducts(args?: Parameters<typeof listProducts>[0]) {
  return useQuery({
    queryKey: queryKeys.products(args ?? {}),
    queryFn: () => listProducts(args),
  });
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: queryKeys.product(slug),
    queryFn: () => getProductBySlug(slug),
    enabled: Boolean(slug),
  });
}

export function useBanners() {
  return useQuery({ queryKey: queryKeys.banners, queryFn: listActiveBanners });
}

export function useAllBanners() {
  return useQuery({ queryKey: queryKeys.bannersAll, queryFn: listBannersAll });
}

export function useSettings() {
  return useQuery({ queryKey: queryKeys.settings, queryFn: getSettings });
}

