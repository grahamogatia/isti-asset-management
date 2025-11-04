import { useQuery } from "@tanstack/react-query"
import { getAll } from "./controller";
import type { Settings } from "@/data/types";


const SETTINGS = "settings"

export const useSettings = () => {
    return useQuery({
        queryKey: [SETTINGS],
        queryFn: () => getAll<Settings[]>(SETTINGS),
        staleTime: 60 * 10 * 1000,
    })
}