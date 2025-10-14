import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { catchError, getAll, getOne } from "./controller"
import type { Issuance } from "@/data/types"
import api from "./api/config"

const ISSUANCE = "issuance"

export const useIssuances = () => {
    return useQuery({
        queryKey: [ISSUANCE],
        queryFn: () => getAll<Issuance[]>(ISSUANCE),
        staleTime: 60 * 10 * 1000
    })
}

export const useIssuance = (id: number) => {
    return useQuery({
        queryKey: [ISSUANCE, id],
        queryFn: () => getOne<Issuance>(ISSUANCE, id),
        staleTime: 60 * 10 * 1000
    })
}

export const useAddIssuance = <TData = unknown>() => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async (data: TData) => {
            const formdata = new FormData();
            formdata.append("data", JSON.stringify(data));
            const response = await api.post(`index.php?resource=issuance`, formdata);

            return response.data;
        },
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: [ISSUANCE] });
        },
        onError: catchError,
    });
}

