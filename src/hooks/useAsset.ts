import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { catchError, getAll, getOne } from "./controller"
import type { Asset } from "@/data/types"
import api from "./api/config"

const ASSET = "asset"

export const useAssets = () => {
    return useQuery({
        queryKey: [ASSET],
        queryFn: () => getAll<Asset[]>(ASSET),
        staleTime: 60 * 10 * 1000
    })
}

export const useAsset = (id: number) => {
    return useQuery({
        queryKey: [ASSET, id],
        queryFn: () => getOne<Asset>(ASSET, id),
        staleTime: 60 * 10 * 1000
    })
}

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
}

