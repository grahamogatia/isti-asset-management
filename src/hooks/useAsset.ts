import { useQuery } from "@tanstack/react-query"
import { getAll, getOne } from "./controller"
import type { Asset } from "@/data/types"

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