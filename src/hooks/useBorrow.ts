import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { catchError, getAll, getOne } from "./controller"
import type { Borrow } from "@/data/types"
import api from "./api/config"

const BORROW = "borrow"

export const useBorrows = () => {
    return useQuery({
        queryKey: [BORROW],
        queryFn: () => getAll<Borrow[]>(BORROW),
        staleTime: 60 * 10 * 1000
    })
}

export const useBorrow = (id: number) => {
    return useQuery({
        queryKey: [BORROW, id],
        queryFn: () => getOne<Borrow>(BORROW, id),
        staleTime: 60 * 10 * 1000
    })
}

export const useAddBorrow = <TData = unknown>() => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async (data: TData) => {
            const formdata = new FormData();
            formdata.append("data", JSON.stringify(data));
            const response = await api.post(`index.php?resource=borrow`, formdata);

            return response.data;
        },
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: [BORROW] });
        },
        onError: catchError,
    });
}

