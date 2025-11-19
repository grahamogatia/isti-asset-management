import { useMemo } from "react";
import { useAssets } from "./useAsset";
import { useCategories, useSubCategories, useTypes } from "./useCategory";
import { useConditions } from "./useCondition";
import { useStatuses } from "./useStatus";
import { useFunctionsITAM } from "./useFunctionITAM";
import { useUrgencies } from "./useUrgency";
import { useInsurances } from "./useInsurance";
import { useCompanies, useDepartments, useEmployees, useUnits } from "./useUNMG";

export const useLookupMaps = () => {
  const { data: assets } = useAssets();
  const { data: categories } = useCategories();
  const { data: subCategories } = useSubCategories();
  const { data: types } = useTypes();
  const { data: conditions } = useConditions();
  const { data: statuses } = useStatuses();
  const { data: functions } = useFunctionsITAM();
  const { data: urgencies } = useUrgencies();
  const { data: insurances } = useInsurances();
  const { data: employees } = useEmployees();
  const { data: companies } = useCompanies();
  const { data: departments } = useDepartments();
  const { data: units } = useUnits();

  const lookupMaps = useMemo(() => {
    return {
      assetMap: new Map(assets?.map((a) => [a.asset_id, a]) || []),
      categoryMap: new Map(categories?.map((c) => [c.category_id, c]) || []),
      subCategoryMap: new Map(
        subCategories?.map((s) => [s.sub_category_id, s]) || []
      ),
      typeMap: new Map(types?.map((t) => [t.type_id, t]) || []),
      conditionMap: new Map(
        conditions?.map((c) => [c.asset_condition_id, c]) || []
      ),
      statusMap: new Map(statuses?.map((s) => [s.status_id, s]) || []),
      functionITAMMap: new Map(functions?.map((f) => [f.function_id, f]) || []),
      urgencyMap: new Map(urgencies?.map((u) => [u.urgency_id, u]) || []),
      insuranceMap: new Map(
        insurances?.map((ins) => [ins.insurance_id, ins]) || []
      ),

      /* TODO: UPDATE when API done */
      employeeMap: new Map(
        (employees ?? []).map((e) => [e.user_id, e]) || []
      ),
      departmentMap: new Map(
        (departments ?? []).map((d) => [d.department_id, d]) || []
      ),
      unitMap: new Map((units ?? []).map((u) => [u.unit_id, u]) || []),
      companyMap: new Map(
        (companies ?? []).map((c) => [c.company_id, c]) || []
      ),
    };
  }, [
    assets,
    categories,
    subCategories,
    types,
    conditions,
    statuses,
    functions,
    urgencies,
    insurances,
    employees,
    departments,
    units
  ]);

  const isLoading =
    !assets ||
    !categories ||
    !subCategories ||
    !types ||
    !conditions ||
    !statuses ||
    !functions ||
    !urgencies ||
    !insurances;

  return {
    ...lookupMaps,
    isLoading,
  };
};
