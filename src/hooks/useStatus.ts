import type { Status } from "@/data/types";
import { useQuery } from "@tanstack/react-query";
import { getAll, getOne } from "./controller";

const STATUS = "status";

export const useStatuses = () => {
  return useQuery({
    queryKey: [STATUS],
    queryFn: () => getAll<Status[]>(STATUS),
    staleTime: 60 * 10 * 1000,
  });
};

export const useStatus = (id: number) => {
  return useQuery({
    queryKey: [STATUS, id],
    queryFn: () => getOne<Status>(STATUS, id),
    staleTime: 60 * 10 * 1000,
  });
};
