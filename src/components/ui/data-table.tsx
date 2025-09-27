import * as React from "react";

import {
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./button";
import { Input } from "./input";
import { useState, useEffect } from "react";
import Filters from "./filters";
import FilterBar from "../pages/filters/FilterBar";
import { formatColumnName, getColumnIcon } from "@/lib/columnNameUtils";
import type { ActiveFilter } from "@/data/types";
import NewAssetSheet from "../layout/NewAssetSheet";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  children?: React.ReactNode;
  defaultVisibleColumns?: string[];
  filterableColumns: string[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  children,
  defaultVisibleColumns,
  filterableColumns,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>(() => {
      if (!defaultVisibleColumns) {
        return {};
      }

      const initialVisibility: VisibilityState = {};
      columns.forEach((column: any) => {
        const columnKey = column.accessorKey || column.id;
        if (columnKey) {
          initialVisibility[columnKey] =
            defaultVisibleColumns.includes(columnKey);
        }
      });

      return initialVisibility;
    });

  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [appliedFilters, setAppliedFilters] = useState<
    { columnName: string; values: string[] }[]
  >([]);

  const handleFiltersChange = (columnName: string, values: string[]) => {
    setAppliedFilters((previousFilters) => {
      const existingFilterIndex = previousFilters.findIndex(
        (filter) => filter.columnName === columnName
      );

      if (values.length === 0) {
        return previousFilters.filter(
          (filter) => filter.columnName !== columnName
        );
      }
      const newFilter = { columnName, values };

      if (existingFilterIndex >= 0) {
        const updatedFilters = [...previousFilters];
        updatedFilters[existingFilterIndex] = newFilter;
        return updatedFilters;
      } else {
        return [...previousFilters, newFilter];
      }
    });
    console.log("Applied Filters: ", appliedFilters);
  };

  const getActiveFiltersForDisplay = (): ActiveFilter[] => {
    
    return appliedFilters.map(filter => ({
      id: filter.columnName,
      columnName: filter.columnName,
      values: filter.values,
      displayLabel: `${formatColumnName(filter.columnName)}: ${filter.values.join(', ')}`
    }));
  };

  const getAvailableColumns = () => {
    const usedColumns = appliedFilters.map(filter => filter.columnName);
    return filterableColumns.filter(column => !usedColumns.includes(column));
  };

  // FilterBar handlers
  const handleEditFilter = (columnName: string) => {
    console.log("Edit filter clicked for:", columnName);
  };

  const handleDeleteFilter = (columnName: string) => {
    handleFiltersChange(columnName, []);
  };

  useEffect(() => {
    const convertedFilters = appliedFilters.map((filter) => {
      return {
        id: filter.columnName, // No conversion needed!
        value: filter.values,
      };
    });
    setColumnFilters(convertedFilters);
  }, [appliedFilters]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  });

  return (
    <div>
      <div className="flex items-center pb-1">
        <div className="space-y-1 w-full">
          <div className="flex justify-between gap-4 w-full">
            {children}
            <Input
              placeholder="Search asset..."
              value={globalFilter}
              onChange={(event) => setGlobalFilter(event.target.value)}
              className="max-w-60 mr-auto"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Columns
                </Button>
              </DropdownMenuTrigger>
              <NewAssetSheet/>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    const displayName = column.id
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (char) => char.toUpperCase());
                    const IconComponent = getColumnIcon(column.id);
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                        onSelect={(event) => {
                          event.preventDefault();
                        }}
                      >
                        <IconComponent />
                        {displayName}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* <Filters
            filterableColumns={getAvailableColumns()}
            data={data}
            onFiltersChange={handleFiltersChange}
          /> */}
          <FilterBar
            data={data}
            activeFilters={getActiveFiltersForDisplay()}
            availableColumns={getAvailableColumns()}
            onFiltersChange={handleFiltersChange}
            onEditFilter={handleEditFilter}
            onDeleteFilter={handleDeleteFilter}
          />
        </div>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="text-muted-foreground flex-1 text-sm">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
