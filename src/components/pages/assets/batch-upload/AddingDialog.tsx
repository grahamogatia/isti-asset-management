import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  useAddCategory,
  useAddSubCategory,
  useAddType,
  useCategories,
  useSubCategories,
  useTypes,
} from "@/hooks/useCategory";
import { useQueryClient } from "@tanstack/react-query";
import type {
  Asset_Category,
  Asset_Sub_Category,
  Asset_Type,
} from "@/data/types";

function compareNames(a?: string, b?: string) {
  return (
    String(a ?? "")
      .trim()
      .toLowerCase() ===
    String(b ?? "")
      .trim()
      .toLowerCase()
  );
}

function getCode(name: string): string {
  if (!name) return "";
  return name
    .replace(/[aeiou]/gi, "")
    .slice(0, 3)
    .toUpperCase();
}

function AddingDialog({ excelData }: { excelData: any[] }) {
  const queryClient = useQueryClient();

  // Prefer async mutate if provided by hooks; fall back to callback-style mutate
  const { mutate: addCategory, mutateAsync: addCategoryAsync } =
    useAddCategory();
  const { mutate: addSubCategory, mutateAsync: addSubCategoryAsync } =
    useAddSubCategory();
  const { mutate: addType, mutateAsync: addTypeAsync } = useAddType();

  const { data: categories } = useCategories();
  const { data: subCategories } = useSubCategories();
  const { data: types } = useTypes();

  const steps = ["categories", "subcategories", "type", "assets"];
  const [stepIndex, setStepIndex] = useState(0);
  const [working, setWorking] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [progressText, setProgressText] = useState<string | null>(null);

  async function callMutateAsyncOrWrap<TArgs = any, TResult = any>(
    mutateAsyncFn: ((arg: TArgs) => Promise<TResult>) | undefined,
    mutateFn: ((arg: TArgs, opts?: any) => void) | undefined,
    payload: TArgs
  ) {
    if (typeof mutateAsyncFn === "function") {
      return mutateAsyncFn(payload);
    }
    // wrap callback-style mutate into promise
    return new Promise<TResult>((resolve, reject) => {
      try {
        mutateFn?.(payload, {
          onSuccess: (res: TResult) => resolve(res),
          onError: (err: any) => reject(err),
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  async function createCategoriesAsync() {
    setErrors([]);
    setWorking(true);
    setProgressText("Collecting categories...");
    try {
      const uniqueCategories = [
        ...new Set(
          (excelData ?? [])
            .map((r) => String(r?.category ?? "").trim())
            .filter(Boolean)
        ),
      ];

      const currentCategories =
        queryClient.getQueryData<Asset_Category[] | undefined>(["category"]) ??
        categories ??
        [];

      const toCreate = uniqueCategories.filter(
        (name) =>
          !currentCategories.some((c) => compareNames(c.category_name, name))
      );

      if (toCreate.length === 0) {
        setProgressText("No new categories to create.");
        return { success: true, created: 0, errors: [] as any[] };
      }

      const promises = toCreate.map((name, i) => {
        setProgressText(`Creating category ${i + 1}/${toCreate.length}...`);
        return callMutateAsyncOrWrap(addCategoryAsync, addCategory, {
          category_name: name,
        }).catch((err) => ({ __err: err, name }));
      });

      const results = await Promise.all(promises);
      const errs = results
        .filter((r: any) => r && r.__err)
        .map((r: any) => `${r.name}: ${String(r.__err)}`);
      await queryClient.invalidateQueries({ queryKey: ["category"] });
      setProgressText(null);
      return {
        success: errs.length === 0,
        created: results.length - errs.length,
        errors: errs,
      };
    } catch (err: any) {
      return { success: false, created: 0, errors: [String(err)] };
    } finally {
      setWorking(false);
    }
  }

  async function createSubCategoriesAsync() {
    setErrors([]);
    setWorking(true);
    setProgressText("Collecting sub-categories...");
    try {
      // build mapping category -> Set(subCategory)
      const map: Record<string, Set<string>> = {};
      (excelData ?? []).forEach((r) => {
        const cat = String(r?.category ?? "").trim();
        const sub = String(r?.sub_category ?? "").trim();
        if (!cat) return;
        map[cat] = map[cat] || new Set();
        if (sub) map[cat].add(sub);
      });

      const currentCategories =
        queryClient.getQueryData<Asset_Category[] | undefined>(["category"]) ??
        categories ??
        [];
      const currentSubCategories =
        queryClient.getQueryData<Asset_Sub_Category[] | undefined>([
          "subcategory",
        ]) ??
        subCategories ??
        [];

      const tasks: Promise<any>[] = [];
      const entries = Object.entries(map);
      let counter = 0;
      for (const [categoryName, subSet] of entries) {
        const categoryFound = currentCategories.find((c) =>
          compareNames(c.category_name, categoryName)
        );
        if (!categoryFound?.category_id) {
          // skip; categories should have been created previously
          continue;
        }
        const catId =
          (categoryFound as any).category_id ?? (categoryFound as any).id;
        for (const subName of Array.from(subSet)) {
          const exists = currentSubCategories.some(
            (s) =>
              ((s as any).category_id ?? (s as any).categoryId) === catId &&
              compareNames(
                (s as any).sub_category_name ?? (s as any).sub_category,
                subName
              )
          );
          if (exists) continue;
          counter++;
          setProgressText(`Creating sub-category ${counter}...`);
          tasks.push(
            callMutateAsyncOrWrap(addSubCategoryAsync, addSubCategory, {
              sub_category_name: subName,
              category_id: catId,
              code: getCode(subName),
            }).catch((err) => ({
              __err: err,
              name: subName,
              cat: categoryName,
            }))
          );
        }
      }

      if (tasks.length === 0) {
        setProgressText("No new sub-categories to create.");
        await queryClient.invalidateQueries({ queryKey: ["subcategory"] });
        return { success: true, created: 0, errors: [] as any[] };
      }

      const results = await Promise.all(tasks);
      const errs = results
        .filter((r: any) => r && r.__err)
        .map((r: any) => `${r.cat}/${r.name}: ${String(r.__err)}`);
      await queryClient.invalidateQueries({ queryKey: ["subcategory"] });
      setProgressText(null);
      return {
        success: errs.length === 0,
        created: results.length - errs.length,
        errors: errs,
      };
    } catch (err: any) {
      return { success: false, created: 0, errors: [String(err)] };
    } finally {
      setWorking(false);
    }
  }

  async function createTypesAsync() {
    setErrors([]);
    setWorking(true);
    setProgressText("Collecting types...");
    try {
      // build mapping: category -> subCategory -> Set(types)
      const map: Record<string, Record<string, Set<string>>> = {};
      for (const r of excelData ?? []) {
        const cat = String(r?.category ?? "").trim();
        if (!cat) continue;
        const sub = String(r?.sub_category ?? "").trim(); // may be empty
        const t = String(r?.type ?? "").trim();
        if (!t) continue;
        map[cat] = map[cat] || {};
        const subKey = sub || "";
        map[cat][subKey] = map[cat][subKey] || new Set();
        map[cat][subKey].add(t);
      }

      const currentCategories =
        queryClient.getQueryData<Asset_Category[] | undefined>(["category"]) ??
        categories ??
        [];
      const currentSubCategories =
        queryClient.getQueryData<Asset_Sub_Category[] | undefined>([
          "subcategory",
        ]) ??
        subCategories ??
        [];
      const currentTypes =
        queryClient.getQueryData<Asset_Type[] | undefined>(["types"]) ??
        types ??
        [];

      const tasks: Promise<any>[] = [];
      let counter = 0;

      for (const categoryName of Object.keys(map)) {
        const subMap = map[categoryName];
        const categoryFound = currentCategories.find((c) =>
          compareNames(c.category_name, categoryName)
        );
        if (!categoryFound?.category_id) {
          // category should exist (created earlier). skip if not.
          continue;
        }
        const catId =
          (categoryFound as any).category_id ?? (categoryFound as any).id;

        for (const subKey of Object.keys(subMap)) {
          // resolve subCategory id if subKey provided
          let subId: number | null = null;
          if (subKey) {
            const subFound = currentSubCategories.find(
              (s) =>
                ((s as any).category_id ?? (s as any).categoryId) === catId &&
                compareNames(
                  (s as any).sub_category_name ?? (s as any).sub_category,
                  subKey
                )
            );
            if (!subFound?.sub_category_id) {
              // subcategory missing -> skip types under it
              continue;
            }
            subId =
              (subFound as any).sub_category_id ?? (subFound as any).id ?? null;
          }

          for (const typeName of Array.from(subMap[subKey])) {
            const exists = currentTypes.some((t) => {
              const tCatId = (t as any).category_id ?? (t as any).categoryId;
              const tSubId =
                (t as any).sub_category_id ?? (t as any).subCategoryId;
              if (
                !compareNames((t as any).type_name ?? (t as any).type, typeName)
              )
                return false;
              // if subId provided, match by sub; otherwise match by category
              if (subId != null) return tSubId === subId;
              return tCatId === catId;
            });
            if (exists) continue;
            counter++;
            setProgressText(`Creating type ${counter}...`);
            tasks.push(
              callMutateAsyncOrWrap(addTypeAsync, addType, {
                type_name: typeName,
                type_code: getCode(typeName),
                category_id: catId,
                sub_category_id: subId,
              }).catch((err) => ({
                __err: err,
                name: typeName,
                cat: categoryName,
                sub: subKey,
              }))
            );
          }
        }
      }

      if (tasks.length === 0) {
        setProgressText("No new types to create.");
        await queryClient.invalidateQueries({ queryKey: ["types"] });
        return { success: true, created: 0, errors: [] as any[] };
      }

      const results = await Promise.all(tasks);
      const errs = results
        .filter((r: any) => r && r.__err)
        .map((r: any) => `${r.cat}/${r.sub}/${r.name}: ${String(r.__err)}`);
      await queryClient.invalidateQueries({ queryKey: ["types"] });
      setProgressText(null);
      return {
        success: errs.length === 0,
        created: results.length - errs.length,
        errors: errs,
      };
    } catch (err: any) {
      return { success: false, created: 0, errors: [String(err)] };
    } finally {
      setWorking(false);
    }
  }

  async function createAssetsToPush() {
    setErrors([]);
    setWorking(true);
    setProgressText("Building assets payload...");
    try {
      const currentCategories =
        queryClient.getQueryData<Asset_Category[] | undefined>(["category"]) ??
        categories ??
        [];
      const currentSubCategories =
        queryClient.getQueryData<Asset_Sub_Category[] | undefined>([
          "subcategory",
        ]) ??
        subCategories ??
        [];
      const currentTypes =
        queryClient.getQueryData<Asset_Type[] | undefined>(["types"]) ??
        types ??
        [];

      const assets: any[] = [];
      const errs: string[] = [];

      (excelData ?? []).forEach((row: any, idx: number) => {
        const catName = String(row?.category ?? "").trim();
        const subName = String(row?.sub_category ?? "").trim();
        const typeName = String(row?.type ?? "").trim();

        const categoryFound = currentCategories.find((c) =>
          compareNames(c.category_name, catName)
        );
        const categoryId =
          (categoryFound as any)?.category_id ??
          (categoryFound as any)?.id ??
          null;
        if (!categoryId) {
          errs.push(`Row ${idx + 1}: category "${catName}" not found`);
        }

        let subCategoryId: number | null = null;
        if (subName) {
          const subFound = currentSubCategories.find((s) => {
            const sCatId = (s as any).category_id ?? (s as any).categoryId;
            return (
              sCatId === categoryId &&
              compareNames(
                (s as any).sub_category_name ?? (s as any).sub_category,
                subName
              )
            );
          });
          subCategoryId =
            (subFound as any)?.sub_category_id ?? (subFound as any)?.id ?? null;
          if (!subCategoryId) {
            errs.push(
              `Row ${
                idx + 1
              }: sub-category "${subName}" not found for category "${catName}"`
            );
          }
        }

        let typeId: number | null = null;
        if (typeName) {
          const typeFound = currentTypes.find((t) => {
            const tCatId = (t as any).category_id ?? (t as any).categoryId;
            const tSubId =
              (t as any).sub_category_id ?? (t as any).subCategoryId;
            if (
              !compareNames((t as any).type_name ?? (t as any).type, typeName)
            )
              return false;
            if (subCategoryId != null) return tSubId === subCategoryId;
            return tCatId === categoryId;
          });
          typeId =
            (typeFound as any)?.type_id ?? (typeFound as any)?.id ?? null;
          if (!typeId) {
            errs.push(
              `Row ${idx + 1}: type "${typeName}" not found for ${catName}/${
                subName || "(no sub)"
              }`
            );
          }
        }

        const amountNum =
          row?.amount && typeof row.amount === "string"
            ? Number(String(row.amount).replace(/,/g, "").trim()) || 0
            : Number(row?.amount) || 0;

        assets.push({
          serial_number: row?.serial_number ?? "",
          brand: row?.brand ?? "",
          category_id: categoryId,
          sub_category_id: subCategoryId,
          type_id: typeId,
          status: row?.status ?? "",
          specifications: row?.specifications ?? "",
          amount: amountNum,
          purchase_date: row?.purchase_date ?? null,
          warranty_due_date: row?.warranty_due_date ?? null,
          insurance: row?.insurance ?? "",
          notes: row?.notes ?? "",
          location: row?.location ?? "",
        });
      });
      const assetKeys = Object.keys(assets[0]);
      const assetsValues = assets.map((a) => [
        a.serial_number,
        a.brand,
        a.category_id,
        a.sub_category_id,
        a.type_id,
        a.status,
        a.specifications,
        a.amount,
        a.purchase_date,
        a.warranty_due_date,
        a.insurance,
        a.file,
        a.notes,
        a.location,
      ]);

      console.log("Key: ", assetKeys);
      console.log("Assets: ", assetsValues);

      {/* Mutate here */}

      setProgressText(null);
      return { success: errs.length === 0, assetsValues, errors: errs };
    } catch (err: any) {
      return { success: false, assets: [], errors: [String(err)] };
    } finally {
      setWorking(false);
    }
  }

  // Next executes action for current visible step, then advances on success
  const next = async () => {
    if (working) return;
    setErrors([]);
    if (stepIndex === 0) {
      // create categories first
      const res = await createCategoriesAsync();
      if (!res.success) {
        setErrors(res.errors);
        return;
      }
    } else if (stepIndex === 1) {
      const res = await createSubCategoriesAsync();
      if (!res.success) {
        setErrors(res.errors);
        return;
      }
    } else if (stepIndex === 2) {
      const res = await createTypesAsync();
      if (!res.success) {
        setErrors(res.errors);
        return;
      }
    } else if (stepIndex === 3) {
      const res = await createAssetsToPush();
      if (!res.success) {
        setErrors(res.errors);
        return;
      }
    }
    setStepIndex((s) => Math.min(s + 1, steps.length - 1));
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={excelData.length === 0}>Save</Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Batch create</AlertDialogTitle>

          <div
            id="categories"
            style={{ display: stepIndex === 0 ? undefined : "none" }}
          >
            <div className="mb-2 font-medium">Categories</div>
            <div className="text-sm text-muted-foreground">
              This step will create missing categories found in the uploaded
              Excel.
            </div>
          </div>

          <div
            id="subcategories"
            style={{ display: stepIndex === 1 ? undefined : "none" }}
          >
            <div className="mb-2 font-medium">Sub-categories</div>
            <div className="text-sm text-muted-foreground">
              This step will create missing sub-categories after categories
              exist.
            </div>
          </div>

          <div
            id="type"
            style={{ display: stepIndex === 2 ? undefined : "none" }}
          >
            <div className="mb-2 font-medium">Types</div>
            <div className="text-sm text-muted-foreground">
              This step will create missing types mapped to category →
              sub-category.
            </div>
          </div>

          <div
            id="assets"
            style={{ display: stepIndex === 3 ? undefined : "none" }}
          >
            <div className="mb-2 font-medium">Assets</div>
            <div className="text-sm text-muted-foreground">
              (Not implemented in this dialog)
            </div>
          </div>

          {progressText && <div className="mt-3 text-sm">{progressText}</div>}
          {errors.length > 0 && (
            <div className="mt-3 text-sm text-red-600">
              <div className="font-medium">Errors</div>
              <ul className="list-disc pl-5">
                {errors.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            </div>
          )}
        </AlertDialogHeader>

        <AlertDialogFooter>
          {stepIndex < steps.length - 1 ? (
            <Button onClick={next} disabled={working}>
              {working
                ? "Working..."
                : `Next (${stepIndex + 1}/${steps.length})`}
            </Button>
          ) : (
            <AlertDialogAction asChild>
              <Button
                onClick={async () => {
                  if (working) return;
                  setErrors([]);
                  setWorking(true);
                  try {
                    const res = await createAssetsToPush();
                    if (!res.success) {
                      setErrors(res.errors);
                      console.warn("createAssetsToPush errors:", res.errors);
                    } else {
                      // log assets array
                      console.log("Assets to push:", res.assets);
                    }
                  } catch (err) {
                    console.error("createAssetsToPush failed:", err);
                    setErrors([String(err)]);
                  } finally {
                    setWorking(false);
                    setStepIndex(0);
                  }
                }}
                disabled={working}
              >
                Finish
              </Button>
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AddingDialog;
