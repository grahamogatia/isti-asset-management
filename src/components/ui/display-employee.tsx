import type { Employee } from "@/data/types";
import { getCompanyName, getDepartmentName, getUnitName } from "@/lib/lookups";

function DisplayEmployee({ employee }: { employee: Employee }) {
  const comp = getCompanyName(employee.company_id);
  let dept, unit;
  
  if (employee.department_id) {
    dept = getDepartmentName(employee.department_id);
  }

  if (employee.unit_id) {
    unit = getUnitName(employee.unit_id);
  }

  // Build breadcrumb path
  const pathParts = [comp];
  if (dept) pathParts.push(dept);
  if (unit) pathParts.push(unit);
  pathParts.push(employee.position);
  
  const breadcrumb = pathParts.join(' › ');

  return (
    <div className="flex flex-col justify-start gap-1">
      <span className="font-medium text-gray-900 text-sm leading-tight truncate">
        {employee.name}
      </span>
      <span className="text-xs text-gray-400 leading-tight truncate">
        {breadcrumb}
      </span>
    </div>
  );
}

export default DisplayEmployee;