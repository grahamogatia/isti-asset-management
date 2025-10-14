import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { catchError, getAll, getOne } from "./controller"
import type { Repair } from "@/data/types"
import api from "./api/config"

const REPAIR = "repair"

export const useRepairs = () => {
    return useQuery({
        queryKey: [REPAIR],
        queryFn: () => getAll<Repair[]>(REPAIR),
        staleTime: 60 * 10 * 1000
    })
}

export const useRepair = (id: number) => {
    return useQuery({
        queryKey: [REPAIR, id],
        queryFn: () => getOne<Repair>(REPAIR, id),
        staleTime: 60 * 10 * 1000
    })
}

export const useAddRepair = <TData = unknown>() => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async (data: TData) => {
            const formdata = new FormData();
            formdata.append("data", JSON.stringify(data));
            const response = await api.post(`index.php?resource=repair`, formdata);

            return response.data;
        },
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: [REPAIR] });
        },
        onError: catchError,
    });
}

