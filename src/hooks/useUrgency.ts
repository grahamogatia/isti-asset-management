import type { Urgency } from "@/data/types";
import { useQuery } from "@tanstack/react-query";
import { getAll, getOne } from "./controller";

const URGENCY = "urgency";

export const useUrgencies = () => {
  return useQuery({
    queryKey: [URGENCY],
    queryFn: () => getAll<Urgency[]>(URGENCY),
    staleTime: 60 * 10 * 1000,
  });
};

export const useUrgency = (id: number) => {
  return useQuery({
    queryKey: [URGENCY, id],
    queryFn: () => getOne<Urgency>(URGENCY, id),
    staleTime: 60 * 10 * 1000,
  });
};
