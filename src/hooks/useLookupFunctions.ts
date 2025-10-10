import { useLookupMaps } from "./useLookupMaps";

export const useLookupFunctions = () => {
  const { assetMap, categoryMap, subCategoryMap, typeMap } = useLookupMaps();

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

  return {
    getAsset,
    getCategoryName,
    getSubCategoryName,
    getTypeName,
  };
};
