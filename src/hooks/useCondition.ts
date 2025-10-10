import type { Condition } from "@/data/types";
import { useQuery } from "@tanstack/react-query";
import { getAll, getOne } from "./controller";

const CONDITION = "condition";

export const useConditions = () => {
  return useQuery({
    queryKey: [CONDITION],
    queryFn: () => getAll<Condition[]>(CONDITION),
    staleTime: 60 * 10 * 1000,
  });
};

export const useCondition = (id: number) => {
  return useQuery({
    queryKey: [CONDITION, id],
    queryFn: () => getOne<Condition>(CONDITION, id),
    staleTime: 60 * 10 * 1000,
  });
};
