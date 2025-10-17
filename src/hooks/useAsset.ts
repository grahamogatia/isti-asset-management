import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { catchError, getAll, getOne } from "./controller";
import type { Asset } from "@/data/types";
import api from "./api/config";
import { format, isDate } from "date-fns";

const ASSET = "asset";

export const useAssets = () => {
  return useQuery({
    queryKey: [ASSET],
    queryFn: () => getAll<Asset[]>(ASSET),
    select: (data) => {
      return data.map((item) => {
        return {
          ...item,
          warranty_due_date: new Date(item.warranty_due_date),
          purchase_date: new Date(item.purchase_date),
        };
      });
    },
    staleTime: 60 * 10 * 1000,
  });
};

export const useAsset = (id: number) => {
  return useQuery({
    queryKey: [ASSET, id],
    queryFn: () => getOne<Asset>(ASSET, id),
    select: (item) => {
      return {
        ...item,
        warranty_due_date: new Date(item.warranty_due_date),
        purchase_date: new Date(item.purchase_date),
      };
    },
    staleTime: 60 * 10 * 1000,
  });
};

export const useAddAsset = <TData = unknown>() => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TData) => {
      const formdata = new FormData();
      formdata.append("data", JSON.stringify(data));
      const response = await api.post(`index.php?resource=asset`, formdata);

      return response.data;
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [ASSET] });
    },
    onError: catchError,
  });
};

export const useUpdateAsset = <TData extends {}>() => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: TData }) => {
      const response = await api.put(`index.php?resource=asset`, {
        id: id,
        values: Object.values(data).map((value) => {
          if (isDate(value)) {
            return format(value, "yyyy-MM-dd");
          }

          return value;
        }),
        columns: Object.keys(data),
      });

      return response.data;
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [ASSET] });
    },
    onError: catchError,
  });
};