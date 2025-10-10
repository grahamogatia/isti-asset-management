import type { Insurance } from "@/data/types";
import { useQuery } from "@tanstack/react-query";
import { getAll, getOne } from "./controller";

const INSURANCE = "insurance";

export const useInsurances = () => {
  return useQuery({
    queryKey: [INSURANCE],
    queryFn: () => getAll<Insurance[]>(INSURANCE),
    staleTime: 60 * 10 * 1000,
  });
};

export const useInsurance = (id: number) => {
  return useQuery({
    queryKey: [INSURANCE, id],
    queryFn: () => getOne<Insurance>(INSURANCE, id),
    staleTime: 60 * 10 * 1000,
  });
};
