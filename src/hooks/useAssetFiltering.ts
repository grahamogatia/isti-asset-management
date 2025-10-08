import type { Asset_Category, Asset_Type } from "@/data/types";
import { asset_testcases } from "@/testcases/assets";
import {
  asset_categories,
  asset_sub_categories,
  asset_types,
} from "@/testcases/foreignkeys";
import { useEffect, useMemo, useState } from "react";

const ASSETS = asset_testcases;
const CATEGORIES = asset_categories;
const SUB_CATEGORIES = asset_sub_categories;
const TYPES = asset_types;

export const useAssetFiltering = (category: Asset_Category) => {
  const getFirstSubCategory = (catName: string) => {
    const cat = CATEGORIES.find((c) => c.category_name === catName);
    if (!cat) return "";
    const sub = SUB_CATEGORIES.find((s) => s.category_id === cat.category_id);
    return sub?.sub_category_name || "";
  };

  const [subCategory, setSubCategory] = useState<string>(
    getFirstSubCategory(category.category_name)
  );
  const [selectedType, setSelectedType] = useState<string>("All");

  // Reset selectedType when subCategory changes
  useEffect(() => {
    setSelectedType("All");
  }, [subCategory]);

  const subCats = useMemo(
    () =>
      SUB_CATEGORIES.filter(
        (sub) => sub.category_id === category.category_id
      ),
    [category.category_id]
  );

  const filteredAssets = useMemo(() => {
    const result1 = CATEGORIES.find(
      (categoryTest) => categoryTest.category_name === category.category_name
    );
    const result2 = SUB_CATEGORIES.find(
      (subCategoryTest) =>
        subCategoryTest.sub_category_name === subCategory &&
        subCategoryTest.category_id === result1?.category_id
    );

    if (!result1 || !result2) return [];

    return ASSETS.filter(
      (assetTest) =>
        assetTest.category_id === result1.category_id &&
        assetTest.sub_category_id === result2.sub_category_id
    );
  }, [category, subCategory]);

  const filteredAssetTypes = useMemo<Asset_Type[]>(() => {
    const uniqueTypeIds = Array.from(
      new Set(filteredAssets.map((asset) => asset.type_id))
    );

    return uniqueTypeIds
      .filter((id): id is number => typeof id === "number")
      .flatMap((type_id) => {
        const assetType = TYPES.find((type) => type.type_id === type_id);
        return assetType ? [assetType] : [];
      });
  }, [filteredAssets]);

  const displayedAssets = useMemo(() => {
    if (selectedType === "All") return filteredAssets;
    return filteredAssets.filter((asset) => {
      return String(asset.type_id) === selectedType;
    });
  }, [filteredAssets, selectedType]);

  return {
    subCategory,
    setSubCategory,
    selectedType,
    setSelectedType,
    subCats,
    filteredAssetTypes,
    displayedAssets,
  };
};
