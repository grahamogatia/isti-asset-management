import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Company, Department, Unit } from "@/data/types";
import { Separator } from "./separator";
import { ChevronRight, Filter, X, Settings2 } from "lucide-react";

export default function OrgFilter({
  companies,
  departments,
  units,
  onChange,
}: {
  companies: Company[];
  departments: Department[];
  units: Unit[];
  onChange?: (selection: {
    companyId: number | null;
    departmentId?: number | null;
    unitId?: number | null;
  }) => void;
}) {
  const [companyId, setCompanyId] = useState<number | null>(null);
  const [departmentId, setDepartmentId] = useState<number | null>(null);
  const [unitId, setUnitId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    onChange?.({ companyId, departmentId, unitId });
  }, [companyId, departmentId, unitId, onChange]);

  // Get current selections
  const selectedCompany = companyId ? companies.find(c => c.company_id === companyId) : null;
  const selectedDepartment = departmentId ? departments.find(d => d.department_id === departmentId) : null;
  const selectedUnit = unitId ? units.find(u => u.unit_id === unitId) : null;

  // Get available options
  const availableDepartments = companyId
    ? departments.filter((d) => d.company_id === companyId)
    : [];

  const availableUnits = companyId
    ? departmentId
      ? units.filter((u) => u.department_id === departmentId)
      : units.filter((u) => u.company_id === companyId && !u.department_id)
    : [];

  const showDepartments = companyId && availableDepartments.length > 0;
  const showUnits = companyId && (!showDepartments || departmentId) && availableUnits.length > 0;

  const clearSelection = () => {
    setCompanyId(null);
    setDepartmentId(null);
    setUnitId(null);
  };

  const hasSelections = selectedCompany || selectedDepartment || selectedUnit;

  return (
    <div className="space-y-2">
      {/* Filter Header with Breadcrumb */}
      <div className="flex items-center gap-2 w-full">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 data-[state=open]:bg-muted/50"
            >
              <div className="relative">
                <Filter className="h-3 w-3" />
                {hasSelections && (
                  <div className="absolute -top-1 -right-1 h-2 w-2 bg-purple-500 rounded-full"></div>
                )}
              </div>
              <span className="ml-1">Filter</span>
            </Button>
          </PopoverTrigger>
          
          <PopoverContent className="w-100 p-0" align="start" sideOffset={4}>
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <Settings2 className="h-4 w-4 text-muted-foreground" />
                <h4 className="font-semibold text-sm">Organization Filter</h4>
              </div>
              {hasSelections && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearSelection}
                  className="h-6 text-xs text-muted-foreground hover:text-destructive"
                >
                  Clear all
                </Button>
              )}
            </div>
            
            <div className="p-4 space-y-4">
              {/* Company Selection */}
              <div className="space-y-2">
                <Label htmlFor="company-select" className="text-xs font-medium text-muted-foreground">
                  Company
                </Label>
                <Select
                  value={companyId ? String(companyId) : ""}
                  onValueChange={(v) => {
                    const newCompanyId = v ? Number(v) : null;
                    setCompanyId(newCompanyId);
                    setDepartmentId(null);
                    setUnitId(null);
                  }}
                >
                  <SelectTrigger id="company-select" className="h-9 text-sm">
                    <SelectValue placeholder="Select a company" />
                  </SelectTrigger>
                  <SelectContent>
                    {companies.map((c) => (
                      <SelectItem key={c.company_id} value={String(c.company_id)}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Department Selection */}
              {showDepartments && (
                <div className="space-y-2">
                  <Label htmlFor="department-select" className="text-xs font-medium text-muted-foreground">
                    Department
                  </Label>
                  <Select
                    value={departmentId ? String(departmentId) : ""}
                    onValueChange={(v) => {
                      const newDepartmentId = v ? Number(v) : null;
                      setDepartmentId(newDepartmentId);
                      setUnitId(null);
                    }}
                  >
                    <SelectTrigger id="department-select" className="h-9 text-sm">
                      <SelectValue placeholder="Select a department" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableDepartments.map((d) => (
                        <SelectItem key={d.department_id} value={String(d.department_id)}>
                          {d.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Unit Selection */}
              {showUnits && (
                <div className="space-y-2">
                  <Label htmlFor="unit-select" className="text-xs font-medium text-muted-foreground">
                    Unit
                  </Label>
                  <Select
                    value={unitId ? String(unitId) : ""}
                    onValueChange={(v) => {
                      const newUnitId = v ? Number(v) : null;
                      setUnitId(newUnitId);
                    }}
                  >
                    <SelectTrigger id="unit-select" className="h-9 text-sm">
                      <SelectValue placeholder="Select a unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableUnits.map((u) => (
                        <SelectItem key={u.unit_id} value={String(u.unit_id)}>
                          {u.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Current Selection Display */}
              {hasSelections && (
                <div className="pt-2 border-t">
                  <Label className="text-xs font-medium text-muted-foreground mb-2 block">
                    Current Selection
                  </Label>
                  <div className="flex items-center gap-1 text-xs bg-muted/30 rounded-md p-2">
                    <span className="font-medium">{selectedCompany?.name}</span>
                    {selectedDepartment && (
                      <>
                        <ChevronRight className="h-3 w-3 text-muted-foreground" />
                        <span className="font-medium">{selectedDepartment.name}</span>
                      </>
                    )}
                    {selectedUnit && (
                      <>
                        <ChevronRight className="h-3 w-3 text-muted-foreground" />
                        <span className="font-medium">{selectedUnit.name}</span>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>
        
        {/* Breadcrumb Display */}
        {hasSelections && (
          <div className="flex items-center gap-1 min-w-0 text-xs text-muted-foreground">
            <span className="truncate">{selectedCompany?.name}</span>
            {selectedDepartment && (
              <>
                <ChevronRight className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">{selectedDepartment.name}</span>
              </>
            )}
            {selectedUnit && (
              <>
                <ChevronRight className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">{selectedUnit.name}</span>
              </>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSelection}
              className="h-4 w-4 p-0 ml-1 text-muted-foreground hover:text-destructive flex-shrink-0"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>
      
      <Separator/>
    </div>
  );
}