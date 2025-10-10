import {
  type Asset_Sub_Category,
  type Asset_Category,
  type Asset_Type,
} from "@/data/types";
import { useQuery } from "@tanstack/react-query";
import { getAll, getOne } from "./controller";

const CATEGORY = "category";
const SUB_CATEGORY = "subcategory";
const TYPE = "types";

export const useCategories = () => {
  return useQuery({
    queryKey: [CATEGORY],
    queryFn: () => getAll<Asset_Category[]>(CATEGORY),
    staleTime: 60 * 10 * 1000,
  });
};

export const useCategory = (id: number) => {
  return useQuery({
    queryKey: [CATEGORY, id],
    queryFn: () => getOne<Asset_Category>(CATEGORY, id),
    staleTime: 60 * 10 * 1000,
  });
};

export const useSubCategories = () => {
  return useQuery({
    queryKey: [SUB_CATEGORY],
    queryFn: () => getAll<Asset_Sub_Category[]>(SUB_CATEGORY),
    staleTime: 60 * 10 * 1000,
  });
};

export const useSubCategory = (id: number) => {
  return useQuery({
    queryKey: [SUB_CATEGORY, id],
    queryFn: () => getOne<Asset_Category>(SUB_CATEGORY, id),
    staleTime: 60 * 10 * 1000,
  });
};
export const useTypes = () => {
  return useQuery({
    queryKey: [TYPE],
    queryFn: () => getAll<Asset_Type[]>(TYPE),
    staleTime: 60 * 10 * 1000,
  });
};

export const useType = (id: number) => {
  return useQuery({
    queryKey: [TYPE, id],
    queryFn: () => getOne<Asset_Type>(TYPE, id),
    staleTime: 60 * 10 * 1000,
  });
};
