import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { Company, Department, Unit } from "@/data/types";
import { Separator } from "./separator";
import { ChevronRight, Filter, X } from "lucide-react";

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
  const [isExpanded, setIsExpanded] = useState(false);

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
      {/* Toggle Header with Breadcrumb */}
      <div className="flex items-center gap-2 w-full">
        <div className="relative">
          <Button
            variant="ghost"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground flex-shrink-0"
          >
            <Filter className="h-3 w-3" />
          </Button>
          {/* Purple indicator for active filter */}
          {hasSelections && (
            <div className="absolute -top-0.5 -right-0.5 h-2 w-2 bg-purple-500 rounded-full"></div>
          )}
        </div>
        
        <div className="flex-1 min-w-0 text-xs font-medium">
          {hasSelections ? (
            <div className="flex items-center gap-1 min-w-0">
              <span className="font-medium text-muted-foreground">{selectedCompany?.name}</span>
              {selectedDepartment && (
                <>
                  <ChevronRight className="h-3 w-3 text-muted-foreground" />
                  <span className="font-medium text-muted-foreground">{selectedDepartment.name}</span>
                </>
              )}
              {selectedUnit && (
                <>
                  <ChevronRight className="h-3 w-3 text-muted-foreground" />
                  <span className="font-medium text-muted-foreground">{selectedUnit.name}</span>
                </>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSelection}
                className="h-4 w-4 p-0 ml-1 text-muted-foreground hover:bg-destructive hover:text-destructive-foreground"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ) : (
            <span className="text-muted-foreground">Filter by Organization</span>
          )}
        </div>
      </div>

      {/* Collapsible Content */}
      {isExpanded && (
        <div className="space-y-1">
          {/* Company Select */}
          <Select
            value={companyId ? String(companyId) : ""}
            onValueChange={(v) => {
              const newCompanyId = v ? Number(v) : null;
              setCompanyId(newCompanyId);
              setDepartmentId(null);
              setUnitId(null);
            }}
          >
            <SelectTrigger className="h-8 bg-muted/50 border-muted-foreground/20 text-xs hover:bg-muted/70 focus:ring-1 focus:ring-muted-foreground/30">
              <SelectValue placeholder="Select company" />
            </SelectTrigger>
            <SelectContent>
              {companies.map((c) => (
                <SelectItem key={c.company_id} value={String(c.company_id)} className="text-xs">
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Department Select */}
          {showDepartments && (
            <Select
              value={departmentId ? String(departmentId) : ""}
              onValueChange={(v) => {
                const newDepartmentId = v ? Number(v) : null;
                setDepartmentId(newDepartmentId);
                setUnitId(null);
              }}
            >
              <SelectTrigger className="h-8 bg-muted/50 border-muted-foreground/20 text-xs hover:bg-muted/70 focus:ring-1 focus:ring-muted-foreground/30">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {availableDepartments.map((d) => (
                  <SelectItem key={d.department_id} value={String(d.department_id)} className="text-xs">
                    {d.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {/* Unit Select */}
          {showUnits && (
            <Select
              value={unitId ? String(unitId) : ""}
              onValueChange={(v) => {
                const newUnitId = v ? Number(v) : null;
                setUnitId(newUnitId);
              }}
            >
              <SelectTrigger className="h-8 bg-muted/50 border-muted-foreground/20 text-xs hover:bg-muted/70 focus:ring-1 focus:ring-muted-foreground/30">
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                {availableUnits.map((u) => (
                  <SelectItem key={u.unit_id} value={String(u.unit_id)} className="text-xs">
                    {u.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      )}
      
    </div>
  );
}