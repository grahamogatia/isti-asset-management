import { useQuery } from "@tanstack/react-query";
import { unmg_api } from "./api/config";
import { type UNMGResponse, type Employee, type Company, type Department, type Unit } from "@/data/types";

export const useEmployees = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await unmg_api.get<UNMGResponse<Employee[]>>(
        "/users/summary"
      );
      if (response.data.success) return response.data.data;
      return;
    },
    staleTime: 60 * 10 * 1000,
  });
};

export const useCompanies = () => {
  return useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const response = await unmg_api.get<UNMGResponse<Company[]>>(
        "/companies/companies"
      );
      if (response.data.success) return response.data.data;
      return;
    },
    staleTime: 60 * 10 * 1000,
  });
};

export const useDepartments = () => {
  return useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      const response = await unmg_api.get<UNMGResponse<Department[]>>(
        "/companies/departments"
      );
      if (response.data.success) return response.data.data;
      return;
    },
    staleTime: 60 * 10 * 1000,
  });
};

export const useUnits = () => {
  return useQuery({
    queryKey: ["units"],
    queryFn: async () => {
      const response = await unmg_api.get<UNMGResponse<Unit[]>>(
        "/companies/units"
      );
      if (response.data.success) return response.data.data;
      return;
    },
    staleTime: 60 * 10 * 1000,
  });
};
