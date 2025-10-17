import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { catchError, getAll, getOne } from "./controller";
import type { Borrow } from "@/data/types";
import api from "./api/config";
import { format, isDate } from "date-fns";

const BORROW = "borrow";

export const useBorrows = () => {
  return useQuery({
    queryKey: [BORROW],
    queryFn: () => getAll<Borrow[]>(BORROW),
    select: (data) => {
      return data.map((item) => {
        return {
          ...item,
          date_borrowed: new Date(item.date_borrowed),
          due_date: new Date(item.due_date as Date),
          return_date: new Date(item.return_date as Date),
        };
      });
    },
    staleTime: 60 * 10 * 1000,
  });
};

export const useBorrow = (id: number) => {
  return useQuery({
    queryKey: [BORROW, id],
    queryFn: () => getOne<Borrow>(BORROW, id),
    select: (item) => {
      return {
        ...item,
        date_borrowed: new Date(item.date_borrowed),
        due_date: new Date(item.due_date as Date),
        return_date: new Date(item.return_date as Date),
      };
    },
    staleTime: 60 * 10 * 1000,
  });
};

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
};

export const useUpdateBorrow = <TData extends {}>() => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: TData }) => {
      const response = await api.put(`index.php?resource=borrow`, {
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
      queryClient.refetchQueries({ queryKey: [BORROW] });
    },
    onError: catchError,
  });
};