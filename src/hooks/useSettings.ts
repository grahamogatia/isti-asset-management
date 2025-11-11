import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getAll, catchError } from "./controller";
import type { Settings } from "@/data/types";
import api from "./api/config";


const SETTINGS = "settings"

export const useSettings = () => {
    return useQuery({
        queryKey: [SETTINGS],
        queryFn: () => getAll<Settings[]>(SETTINGS),
        staleTime: 60 * 10 * 1000,
    })
}

export const useUpdateSetting = <TData extends {}>() => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: TData }) => {
      const response = await api.put(`index.php?resource=${SETTINGS}`, {
        id: id,
        values: Object.values(data).map((value) => {
          return value;
        }),
        columns: Object.keys(data),
      });

      return response.data;
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [SETTINGS] });
    },
    onError: catchError,
  });
};