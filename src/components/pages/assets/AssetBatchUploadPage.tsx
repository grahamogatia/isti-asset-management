import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type {
  Asset_Category,
  Asset_Sub_Category,
  Asset_Type,
} from "@/data/types";
import { useAddAsset } from "@/hooks/useAsset";
import {
  useAddCategory,
  useAddSubCategory,
  useAddType,
  useCategories,
  useSubCategories,
  useTypes,
} from "@/hooks/useCategory";
import { getColumnIcon } from "@/lib/columnNameUtils";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useState } from "react";
import * as XLSX from "xlsx";

function AssetBatchUploadPage() {
  const [excelData, setExcelData] = useState<any[]>([]);

  const { data: categories } = useCategories();
  const { data: subCategories } = useSubCategories();
  const { data: types } = useTypes();

  const queryClient = useQueryClient();
  const { mutateAsync: addCategoryAsync } = useAddCategory();
  const { mutateAsync: addSubCategoryAsync } = useAddSubCategory();
  const { mutateAsync: addTypeAsync } = useAddType();
  const { mutateAsync: addAssetAsync } = useAddAsset();

  const excelSerialToDate = (serial: number) => {
    const utcDays = serial - 25569;
    const ms = Math.round(utcDays * 86400 * 1000);
    return new Date(ms);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json<Record<string, any>>(sheet, {
        defval: "",
      });

      const nf = new Intl.NumberFormat("en-US");

      const normalized = jsonData.map((row) => {
        const out: Record<string, any> = {};
        Object.entries(row).forEach(([k, v]) => {
          const key = String(k).toLowerCase();

          // amount -> format as number with commas
          if (key.includes("amount")) {
            const num = Number(v) || 0;
            out[k] = nf.format(num);
            return;
          }

          // date-like fields -> format yyyy-MM-dd
          if (/(purchase|warranty|date)/i.test(k)) {
            if (typeof v === "number") {
              const d = excelSerialToDate(v);
              out[k] = format(d, "yyyy-MM-dd");
            } else if (v) {
              const d = new Date(v);
              out[k] = !isNaN(d.getTime())
                ? format(d, "yyyy-MM-dd")
                : String(v);
            } else {
              out[k] = "";
            }
            return;
          }

          // default passthrough
          out[k] = v;
        });
        return out;
      });

      setExcelData(normalized); // store normalized rows
    };

    reader.readAsArrayBuffer(file);
  };

  const formatHeader = (header: string) => {
    return header
      .replace(/_/g, " ")
      .split(" ")
      .map((w) =>
        w.length ? w[0].toUpperCase() + w.slice(1).toLowerCase() : w
      )
      .join(" ");
  };

  const clear = () => {
    setExcelData([]);
  };

  // async function ensureCategory(name?: string) {
  //   const n = (name ?? "").trim();
  //   if (!n) return null;
  //   const found = categories?.find(
  //     (c: any) => c.category_name?.toLowerCase() === n.toLowerCase()
  //   );
  //   if (found) return found.category_id;
  //   const created = await addCategoryAsync({ category_name: n });
  //   // refresh cache (hooks useQuery will refetch on success already, but ensure)
  //   await queryClient.invalidateQueries({ queryKey: ["category"] });
  //   return created?.category_id ?? created?.id;
  // }

  const compareNames = (a?: string, b?: string) => {
    return (
      String(a ?? "")
        .trim()
        .toLowerCase() ===
      String(b ?? "")
        .trim()
        .toLowerCase()
    );
  };

  function ensureCategory(rowCategoryName: string) {
    const categoryFound = categories?.find((c: Asset_Category) =>
      compareNames(c.category_name, rowCategoryName)
    );

    if (!categoryFound) {
      // Create new category
      // Return new category ID
    }

    return categoryFound?.category_id;
  }

  function ensureSubCategory(rowSubCategoryName: string, categoryId: number) {
    const subCategoryFound = subCategories?.find((s: Asset_Sub_Category) => {
      if (s.category_id !== categoryId) return false;
      return compareNames(s.sub_category_name, rowSubCategoryName);
    });

    if (!subCategoryFound) {

      // Create new sub category
      // Return new sub category ID
    }

    return subCategoryFound?.sub_category_id;
  }

  function ensureType(rowTypeName: string, categoryId: number, subCategoryId: number) {
    const typeFound = types?.find((t: Asset_Type) => {
      if (t.category_id !== categoryId && t.sub_category_id !== subCategoryId) return false; 
      return compareNames(t.type_name, rowTypeName);
    });

    if (!typeFound) {
      // Create new type
      // Return new type ID
    }

    return typeFound?.type_id;
  }

  function onSubmit() {
    // clear();

    if (!excelData?.length) return;
    try {
      const assetsToCreate: any[] = [];

      // Creating Categories > Sub categories > Types
      for (const row of excelData) {
       

        const categoryId = ensureCategory(row.category);
        const subCategoryId = ensureSubCategory(row.sub_category, categoryId as number);
        const typeId = ensureType(row.type, categoryId as number, subCategoryId as number);


      }
    } catch (err) {
      console.error(err);
    }
  }

  const headers = excelData[0] ? Object.keys(excelData[0]) : [];

  return (
    <div className="p-2 pl-5.5">
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Batch Upload Assets</ItemTitle>
          <ItemDescription>
            Upload an Excel to create multiple assets at once.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <div className="grid w-full max-w-sm items-center gap-3">
            <Input
              id="excel"
              type="file"
              accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
              onChange={handleFileUpload}
            />
            <div className="flex gap-2">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={clear}
                  disabled={excelData.length === 0}
                >
                  Clear
                </Button>
              </div>
              <div className="flex gap-2">
                <Button
                  type="submit"
                  onClick={onSubmit}
                  disabled={excelData.length === 0}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </ItemActions>
      </Item>

      {excelData.length > 0 && (
        <Table className="table-fixed">
          <TableCaption>Assets to Upload</TableCaption>
          <TableHeader>
            <TableRow>
              {headers.map((header) => {
                const Icon = getColumnIcon(header);
                return (
                  <TableHead
                    key={header}
                    className="w-40 max-w-[12rem] px-2 py-1 text-left truncate"
                  >
                    {Icon ? (
                      <Icon className="mr-2 h-4 w-4 inline-block" />
                    ) : null}
                    {formatHeader(header)}
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {excelData.map((row, ri) => (
              <TableRow key={ri}>
                {headers.map((h) => (
                  <TableCell
                    key={h}
                    className="w-40 max-w-[12rem] px-2 py-1 align-top overflow-hidden"
                  >
                    <Input
                      type="text"
                      value={
                        excelData[ri]?.[h] === null ||
                        excelData[ri]?.[h] === undefined
                          ? ""
                          : String(excelData[ri][h])
                      }
                      onChange={(e) => {
                        const val = e.currentTarget.value;
                        setExcelData((prev) =>
                          prev.map((r, idx) =>
                            idx === ri ? { ...r, [h]: val } : r
                          )
                        );
                      }}
                      className="w-full text-xs"
                      aria-label={`${formatHeader(h)} row ${ri + 1}`}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default AssetBatchUploadPage;
