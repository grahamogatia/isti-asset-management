import type { Employee } from "@/data/types";
import { company, departments, units } from "@/testcases/foreignkeys";

function DisplayEmployee({ employee }: { employee: Employee }) {
  // Get actual objects with aliases
  const companyData = company.find(c => c.company_id === employee.company_id);
  const departmentData = employee.department_id 
    ? departments.find(d => d.department_id === employee.department_id)
    : null;
  const unitData = employee.unit_id 
    ? units.find(u => u.unit_id === employee.unit_id)
    : null;

  // Build organization breadcrumb using aliases when available
  const orgParts = [];
  
  // Use company alias (UNAI instead of United Neon Advertising, Inc.)
  orgParts.push(companyData?.alias || companyData?.name || 'Unknown Company');
  
  // Use department alias if available
  if (departmentData) {
    orgParts.push(departmentData.alias || departmentData.name);
  }
  
  // Use unit alias if available  
  if (unitData) {
    orgParts.push(unitData.alias || unitData.name);
  }
  
  const orgBreadcrumb = orgParts.join(' › ');
  
  // Smart truncation - limit total breadcrumb length
  const maxTotalLength = 45; // Adjust this to fit your UI
  const combinedBreadcrumb = orgBreadcrumb + ' › ' + employee.position;
  
  let displayBreadcrumb;
  if (combinedBreadcrumb.length > maxTotalLength) {
    // If total is too long, truncate the position
    const availableForPosition = maxTotalLength - orgBreadcrumb.length - 3; // -3 for ' › '
    if (availableForPosition > 10) { // Ensure we have reasonable space for position
      const truncatedPosition = employee.position.substring(0, availableForPosition - 3) + '...';
      displayBreadcrumb = orgBreadcrumb + ' › ' + truncatedPosition;
    } else {
      // If org path is too long, truncate the whole thing
      displayBreadcrumb = combinedBreadcrumb.substring(0, maxTotalLength - 3) + '...';
    }
  } else {
    displayBreadcrumb = combinedBreadcrumb;
  }

  // Build full path for tooltip (no truncation for tooltip)
  const fullPathParts = [];
  if (companyData) fullPathParts.push(companyData.name);
  if (departmentData) fullPathParts.push(departmentData.name);
  if (unitData) fullPathParts.push(unitData.name);
  fullPathParts.push(employee.position);
  const fullPath = fullPathParts.join(' › ');

  return (
    <div className="flex flex-col justify-start gap-1 min-w-0 w-full">
      <span className="font-medium text-gray-900 text-sm leading-tight truncate">
        {employee.name}
      </span>
      <span 
        className="text-xs text-gray-400 leading-tight truncate block" 
        title={fullPath}
      >
        {displayBreadcrumb}
      </span>
    </div>
  );
}

export default DisplayEmployee;