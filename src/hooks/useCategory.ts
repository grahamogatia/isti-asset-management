import {
  type Asset_Sub_Category,
  type Asset_Category,
  type Asset_Type,
} from "@/data/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { catchError, getAll, getOne } from "./controller";
import api from "./api/config";
import { toast } from "sonner";

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

export const useAddCategory = <TData = unknown>() => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TData) => {
      const formdata = new FormData();
      formdata.append("data", JSON.stringify(data));
      const response = await api.post(`index.php?resource=category`, formdata);

      return response.data;
    },
    onSuccess: (data) => {
      if (typeof data === "object") {
        queryClient.refetchQueries({ queryKey: [CATEGORY] });
        toast.success("Successfully added new Category");
      } else {
        throw new Error("Failed to add new Category");
      }
    },
    onError: catchError,
  });
};

export const useAddSubCategory = <TData = unknown>() => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TData) => {
      const formdata = new FormData();
      formdata.append("data", JSON.stringify(data));
      const response = await api.post(`index.php?resource=subcategory`, formdata);

      return response.data;
    },
    onSuccess: (data) => {
      if (typeof data === "object") {
        queryClient.refetchQueries({ queryKey: [SUB_CATEGORY] });
        toast.success("Successfully added new Sub Category");
      } else {
        throw new Error("Failed to add new Sub Category");
      }
    },
    onError: catchError,
  });
};

export const useAddType = <TData = unknown>() => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TData) => {
      const formdata = new FormData();
      formdata.append("data", JSON.stringify(data));
      const response = await api.post(`index.php?resource=types`, formdata);

      return response.data;
    },
    onSuccess: (data) => {
      if (typeof data === "object") {
        queryClient.refetchQueries({ queryKey: [TYPE] });
        toast.success("Successfully added new Type");
      } else {
        throw new Error("Failed to add new Type");
      }
    },
    onError: catchError,
  });
};