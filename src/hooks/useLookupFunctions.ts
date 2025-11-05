import type { Asset_Category, Condition, Insurance, Status } from "@/data/types";
import { useLookupMaps } from "./useLookupMaps";
import { useStatuses } from "./useStatus";

export const useLookupFunctions = () => {
  const { assetMap, categoryMap, subCategoryMap, typeMap, conditionMap, statusMap, functionITAMMap, urgencyMap, isLoading, insuranceMap } = useLookupMaps();
  const { data: statuses } = useStatuses();

  const getAsset = (asset_id: number) => {
    return assetMap.get(asset_id);
  };
  const getCategoryName = (id: number): string => {
    return categoryMap.get(id)?.category_name ?? "Unknown Category";
  };

  const getSubCategoryName = (id: number): string => {
    return subCategoryMap.get(id)?.sub_category_name ?? "Unknown Subcategory";
  };

  const getTypeName = (id: number): string => {
    return typeMap.get(id)?.type_name ?? "Unknown Type";
  };

  const getConditionName = (id: number): string => {
    return conditionMap.get(id)?.asset_condition_name ?? "Unknown Condition";
  }

  const getStatusName = (id: number): string => {
    return statusMap.get(id)?.status_name ?? "Unknown Status";
  }

  const getUrgencyName = (id: number): string => {
    return urgencyMap.get(id)?.urgency_level ?? "Unknown Urgency";
  }

  const getCategories = (): Asset_Category[] => {
    return Array.from(categoryMap.values());
  }

  const getConditions = (): Condition[] => {
    return Array.from(conditionMap.values());
  }

  const getInsurance = (insurance_id: number) => {
    return insuranceMap.get(insurance_id);
  }

  const getStatuses = (functionName: string): Status[] => {
    if (!functionName || !functionITAMMap) return [];
    const target = functionName.trim();
    let functionId: number | null = null;
    for (const [id, fn] of functionITAMMap) {
      const name = String((fn as any)?.function_name ?? "").trim();
      if (name === target) {
        functionId = Number(id);
        break;
      }
    }
    if (functionId == null || !Array.isArray(statuses)) return [];
    return statuses.filter((s) => s.function_id === functionId);
  };

  const getStatusIdGivenStatusName = (functionName: string, statusName: string): number | undefined => {
    const functionStatuses = getStatuses(functionName);
    const status = functionStatuses.find(s => s.status_name === statusName);
    return status?.status_id;
  }

  const getDisplayNameForColumn = (columnName: string, id: number | string): string => {
    if (isLoading) return "Loading...";

    const lookupFunctions: Record<string, (id: any) => string> = {
      category_id: getCategoryName,
      sub_category_id: getSubCategoryName,
      type_id: getTypeName,
      asset_condition_id: getConditionName,
      status_id: getStatusName,
    };

    const lookupFunction = lookupFunctions[columnName];
    if (lookupFunction) {
      return lookupFunction(id);
    }

    return String(id);
  };

  // ✅ Reverse lookup function
  const getIdFromDisplayName = (columnName: string, displayName: string): number | string | null => {
    if (isLoading) return null;

    const mapLookups: Record<string, Map<any, any>> = {
      condition: conditionMap,
      status: statusMap,
      category: categoryMap,
      sub_category: subCategoryMap,
      type: typeMap,
    };

    const map = mapLookups[columnName];
    if (!map) return displayName;

    // Search through the map
    for (const [id, item] of map) {
      const nameField = getNameField(columnName);
      if (item[nameField] === displayName) {
        return id;
      }
    }

    return null;
  };

  const getNameField = (columnName: string): string => {
    const nameFields: Record<string, string> = {
      condition: 'asset_condition_name',
      status: 'status_name',
      insurance: 'insurance_name',
      category: 'category_name',
      department: 'name',
      sub_category: 'sub_category_name',
      type: 'type_name',
      urgency: 'urgency_name',
      company: 'name',
      employee: 'name',
      user_id: 'name',
    };
    return nameFields[columnName] || 'name';
  };

  const isLookupColumn = (columnName: string): boolean => {
    const lookupColumns = [
      "category_id",
      "sub_category_id", 
      "type_id",
      "asset_condition_id",
      "insurance_id",
      "status_id",
      "user_id",
      "employee_id",
      "department_id",
      "company",
      "urgency_id",
    ];
    return lookupColumns.includes(columnName);
  };

  return {
    getAsset,
    getCategoryName,
    getSubCategoryName,
    getTypeName,
    getConditionName,
    getStatusName,
    getUrgencyName,
    getCategories,
    getConditions,
    getStatuses,
    getInsurance,

    getStatusIdGivenStatusName,
    getDisplayNameForColumn,
    getIdFromDisplayName,
    isLookupColumn,
  };
};
