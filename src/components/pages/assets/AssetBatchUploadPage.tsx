import { Input } from "@/components/ui/input";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { useState } from "react";
import * as XLSX from "xlsx";

function AssetBatchUploadPage() {
  const [excelData, setExcelData] = useState<any[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: "" });

      setExcelData(jsonData); // ✅ store parsed Excel rows here
    };

    reader.readAsArrayBuffer(file);
  };

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
          </div>
        </ItemActions>
      </Item>

      {excelData.length > 0 && (
        <pre className="text-xs bg-gray-50 p-2 rounded mt-2 max-h-64 overflow-auto">
          {JSON.stringify(excelData.slice(0, 5), null, 2)}
        </pre>
      )}
    </div>
  );
}

export default AssetBatchUploadPage;
