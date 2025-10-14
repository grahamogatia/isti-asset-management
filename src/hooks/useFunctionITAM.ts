import type { FunctionITAM, Status } from "@/data/types";
import { useQuery } from "@tanstack/react-query";
import { getAll, getOne } from "./controller";

const FUNCTIONITAM = "function";

export const useFunctionsITAM = () => {
  return useQuery({
    queryKey: [FUNCTIONITAM],
    queryFn: () => getAll<FunctionITAM[]>(FUNCTIONITAM),
    staleTime: 60 * 10 * 1000,
  });
};

export const useFunctionITAM = (id: number) => {
  return useQuery({
    queryKey: [FUNCTIONITAM, id],
    queryFn: () => getOne<FunctionITAM>(FUNCTIONITAM, id),
    staleTime: 60 * 10 * 1000,
  });
};
