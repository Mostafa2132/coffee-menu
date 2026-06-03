import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteCategory,
  deleteBanner,
  deleteProduct,
  updateSettings,
  upsertBanner,
  upsertCategory,
  upsertProduct,
} from "@/services/menuApi";
import { queryKeys } from "./queries";

export function useUpsertCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: upsertCategory,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: queryKeys.categories });
    },
  });
}

export function useDeleteCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: queryKeys.categories });
      await qc.invalidateQueries({ queryKey: queryKeys.products({}) });
    },
  });
}

export function useUpsertProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: upsertProduct,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useDeleteProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useUpsertBanner() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: upsertBanner,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: queryKeys.banners });
      await qc.invalidateQueries({ queryKey: queryKeys.bannersAll });
    },
  });
}

export function useDeleteBanner() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteBanner,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: queryKeys.banners });
      await qc.invalidateQueries({ queryKey: queryKeys.bannersAll });
    },
  });
}

export function useUpdateSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateSettings,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: queryKeys.settings });
    },
  });
}

