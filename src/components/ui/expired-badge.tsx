import { Badge } from "@/components/ui/badge";
import { CircleX, CheckCircle } from "lucide-react";

type ExpiredBadgeProps = {
  dateTo?: string | Date | null;
  /**
   * If true, show a non-expired (Active) badge when not expired.
   * Default: true
   */
  showActive?: boolean;
  className?: string;
};

export default function ExpiredBadge({
  dateTo,
  showActive = true,
  className = "",
}: ExpiredBadgeProps) {
  if (!dateTo) return showActive ? (
    <Badge className={className}>
      <CheckCircle className="h-3.5 w-3.5 mr-1" />
      <span className="text-xs font-medium">Active</span>
    </Badge>
  ) : null;

  const dt = dateTo instanceof Date ? dateTo : new Date(dateTo);
  if (isNaN(dt.getTime())) return null;

  const isExpired = dt.getTime() < Date.now();

  if (isExpired) {
    return (
      <Badge variant="destructive" className={className}>
        <CircleX className="h-3.5 w-3.5 mr-1" />
        <span className="text-xs font-medium">Expired</span>
      </Badge>
    );
  }

  return showActive ? (
    <Badge className={className}>
      <CheckCircle className="h-3.5 w-3.5 mr-1" />
      <span className="text-xs font-medium">Active</span>
    </Badge>
  ) : null;
}
