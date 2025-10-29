import { useEffect, useState } from "react";
import type { VisibilityState } from "@tanstack/react-table";

export const useColumnVisibility = (storageKey: string, columns: any[], defaultVisible: string[]) => {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) return JSON.parse(saved);

    const initial: VisibilityState = {};
    columns.forEach((col: any) => {
      const key = col.accessorKey || col.id;
      if (key) initial[key] = defaultVisible.includes(key);
    });
    return initial;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(columnVisibility));
  }, [columnVisibility, storageKey]);

  return [columnVisibility, setColumnVisibility] as const;
}

