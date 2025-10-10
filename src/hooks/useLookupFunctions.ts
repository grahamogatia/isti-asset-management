import { useLookupMaps } from "./useLookupMaps";

export const useLookupFunctions = () => {
  const { assetMap, categoryMap, subCategoryMap, typeMap, conditionMap, statusMap, isLoading } = useLookupMaps();

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

    getDisplayNameForColumn,
    getIdFromDisplayName,
    isLookupColumn,
  };
};
