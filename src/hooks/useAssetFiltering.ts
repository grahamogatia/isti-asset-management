import type { Asset_Category, Asset_Type } from "@/data/types";
import { useEffect, useMemo, useState } from "react";
import { useAssets } from "./useAsset";
import { useCategories, useSubCategories, useTypes } from "./useCategory";

export const useAssetFiltering = (category: Asset_Category) => {
  const { data: assets, isLoading: isLoadingAssets } = useAssets();
  const { data: categories, isLoading: isLoadingCategories } = useCategories();
  const { data: subCategories, isLoading: isLoadingSubCategories } = useSubCategories();
  const { data: types, isLoading: isLoadingTypes } = useTypes();

  const isLoading = isLoadingAssets || isLoadingCategories || isLoadingSubCategories || isLoadingTypes;

  const getFirstSubCategory = (catName: string) => {
    if (!categories) return "";
    
    const cat = categories.find((c) => c.category_name === catName);
    if (!cat || !subCategories) return "";

    const sub = subCategories.find((s) => s.category_id === cat.category_id);
    return sub?.sub_category_name || "";
  };

  const [subCategory, setSubCategory] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("All");

  // ✅ Update subCategory when data loads
  useEffect(() => {
    if (categories && subCategories && category) {
      const firstSub = getFirstSubCategory(category.category_name);
      setSubCategory(firstSub);
    }
  }, [categories, subCategories, category]);

  // Reset selectedType when subCategory changes
  useEffect(() => {
    setSelectedType("All");
  }, [subCategory]);

  const subCats = useMemo(() => {
    if (!subCategories) return [];
    return subCategories.filter((sub) => sub.category_id === category.category_id);
  }, [subCategories, category.category_id]);

  const filteredAssets = useMemo(() => {
    // ✅ Guard against undefined data
    if (!assets || !categories || !subCategories || !subCategory) return [];

    const result1 = categories.find(
      (categoryTest) => categoryTest.category_name === category.category_name
    );
    
    const result2 = subCategories.find(
      (subCategoryTest) =>
        subCategoryTest.sub_category_name === subCategory &&
        subCategoryTest.category_id === result1?.category_id
    );

    if (!result1 || !result2) return [];

    // ✅ Safe filtering with null check
    return assets.filter(
      (assetTest) =>
        assetTest.category_id === result1.category_id &&
        assetTest.sub_category_id === result2.sub_category_id
    );
  }, [assets, categories, subCategories, category, subCategory]);

  const filteredAssetTypes = useMemo<Asset_Type[]>(() => {
    if (!types || !filteredAssets.length) return [];

    const uniqueTypeIds = Array.from(
      new Set(filteredAssets.map((asset) => asset.type_id))
    );

    return uniqueTypeIds
      .filter((id): id is number => typeof id === "number")
      .flatMap((type_id) => {
        const assetType = types.find((type) => type.type_id === type_id);
        return assetType ? [assetType] : [];
      });
  }, [types, filteredAssets]);

  const displayedAssets = useMemo(() => {
    if (selectedType === "All") return filteredAssets;
    return filteredAssets.filter((asset) => {
      return String(asset.type_id) === selectedType;
    });
  }, [filteredAssets, selectedType]);

  return {
    // ✅ Return loading state
    isLoading,
    subCategory,
    setSubCategory,
    selectedType,
    setSelectedType,
    subCats,
    filteredAssetTypes,
    displayedAssets,
  };
};