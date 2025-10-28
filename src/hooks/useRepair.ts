import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { catchError, getAll, getOne } from "./controller";
import type { Repair } from "@/data/types";
import api from "./api/config";
import { format, isDate } from "date-fns";
import { toast } from "sonner";

const REPAIR = "repair";

export const useRepairs = () => {
  return useQuery({
    queryKey: [REPAIR],
    queryFn: () => getAll<Repair[]>(REPAIR),
    select: (data) => {
      return data.map((item) => {
        return {
          ...item,
          date_reported: new Date(item.date_reported),
          repair_start_date: new Date(item.repair_start_date),
        };
      });
    },
    staleTime: 60 * 10 * 1000,
  });
};

export const useRepair = (id: number) => {
  return useQuery({
    queryKey: [REPAIR, id],
    queryFn: () => getOne<Repair>(REPAIR, id),
    select: (item) => {
      return {
        ...item,
        date_reported: new Date(item.date_reported),
        repair_start_date: new Date(item.repair_start_date),
      };
    },
    staleTime: 60 * 10 * 1000,
  });
};

export const useAddRepair = <TData = unknown>() => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TData) => {
      const formdata = new FormData();
      formdata.append("data", JSON.stringify(data));
      const response = await api.post(`index.php?resource=repair`, formdata);

      return response.data;
    },
    onSuccess: (data) => {
      if (typeof data === "object") {
        queryClient.refetchQueries({ queryKey: [REPAIR] });
        toast.success("Successfully added new Repair");
      } else {
        throw new Error("Failed to add new Repair");
      }
    },
    onError: catchError,
  });
};

export const useUpdateRepair = <TData extends {}>() => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: TData }) => {
      const response = await api.put(`index.php?resource=repair`, {
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
      queryClient.refetchQueries({ queryKey: [REPAIR] });
    },
    onError: catchError,
  });
};

export const useDeleteRepair = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await api.delete(`index.php?resource=repair`, {
        params: {
          id: id,
        },
      });

      return response.data;
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [REPAIR] });
    },
    onError: catchError,
  });
};
