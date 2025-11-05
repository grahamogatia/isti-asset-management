import type { Insurance } from "@/data/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { catchError, getAll, getOne } from "./controller";
import api from "./api/config";
import { toast } from "sonner";
import { format, isDate } from "date-fns";

const INSURANCE = "insurance";

export const useInsurances = () => {
  return useQuery({
    queryKey: [INSURANCE],
    queryFn: () => getAll<Insurance[]>(INSURANCE),
    select: (data) => {
      return data.map((item) => {
        return {
          ...item,
          insurance_date_from: new Date(item.insurance_date_from),
          insurance_date_to: new Date(item.insurance_date_to),
        };
      });
    },
    staleTime: 60 * 10 * 1000,
  });
};

export const useInsurance = (id: number) => {
  return useQuery({
    queryKey: [INSURANCE, id],
    queryFn: () => getOne<Insurance>(INSURANCE, id),
    select: (item) => {
      return {
        ...item,
        insurance_date_from: new Date(item.insurance_date_from),
        insurance_date_to: new Date(item.insurance_date_to),
      };
    },
    staleTime: 60 * 10 * 1000,
  });
};

export const useAddInsurance = <TData = unknown>() => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TData) => {
      const formdata = new FormData();
      formdata.append("data", JSON.stringify(data));
      const response = await api.post(
        `index.php?resource=${INSURANCE}`,
        formdata
      );

      return response.data;
    },
    onSuccess: (data) => {
      if (typeof data === "object") {
        queryClient.refetchQueries({ queryKey: [INSURANCE] });
        toast.success("Successfully added new Insurance");
      } else {
        throw new Error("Failed to add new Insurance");
      }
    },
    onError: catchError,
  });
};

export const useUpdateInsurance = <TData extends {}>() => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: TData }) => {
      const response = await api.put(`index.php?resource=${INSURANCE}`, {
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
      queryClient.refetchQueries({ queryKey: [INSURANCE] });
    },
    onError: catchError,
  });
};

export const useDeleteInsurance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await api.delete(`index.php?resource=${INSURANCE}`, {
        params: {
          id: id,
        },
      });

      return response.data;
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [INSURANCE] });
    },
    onError: catchError,
  });
};
