import type { Insurance } from "@/data/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { catchError, getAll, getOne } from "./controller";
import api from "./api/config";
import { toast } from "sonner";

const INSURANCE = "insurance";

export const useInsurances = () => {
  return useQuery({
    queryKey: [INSURANCE],
    queryFn: () => getAll<Insurance[]>(INSURANCE),
    staleTime: 60 * 10 * 1000,
  });
};

export const useInsurance = (id: number) => {
  return useQuery({
    queryKey: [INSURANCE, id],
    queryFn: () => getOne<Insurance>(INSURANCE, id),
    staleTime: 60 * 10 * 1000,
  });
};

export const useAddInsurance = <TData = unknown>() => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TData) => {
      const formdata = new FormData();
      formdata.append("data", JSON.stringify(data));
      const response = await api.post(`index.php?resource=${INSURANCE}`, formdata);

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