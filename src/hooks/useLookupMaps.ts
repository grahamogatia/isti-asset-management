import { useMemo } from "react";
import { useAssets } from "./useAsset";
import { useCategories, useSubCategories, useTypes } from "./useCategory";
import { useConditions } from "./useCondition";
import { useStatuses } from "./useStatus";

export const useLookupMaps = () => {
  const { data: assets } = useAssets();
  const { data: categories } = useCategories();
  const { data: subCategories } = useSubCategories();
  const { data: types } = useTypes();
  const { data: conditions } = useConditions();
  const { data: statuses } = useStatuses();
  

  const lookupMaps = useMemo(() => {
    return {
      assetMap: new Map(assets?.map((a) => [a.asset_id, a]) || []),
      categoryMap: new Map(categories?.map((c) => [c.category_id, c]) || []),
      subCategoryMap: new Map(subCategories?.map((s) => [s.sub_category_id, s]) || []),
      typeMap: new Map(types?.map((t) => [t.type_id, t]) || []),
      conditionMap: new Map(conditions?.map((c) => [c.asset_condition_id, c]) || []),
      statusMap: new Map(statuses?.map((s) => [s.status_id, s]) || []),
    };
  }, [assets, categories, subCategories, types]);

  const isLoading = !assets || !categories || !subCategories || !types;

  return {
    ...lookupMaps,
    isLoading,
  };
};
