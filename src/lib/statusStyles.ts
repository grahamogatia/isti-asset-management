import {
  CheckCircle,
  ArrowRightLeft,
  Wrench,
  Hammer,
  Clock,
  PauseCircle,
  CircleX,
  Trash2,
  ThumbsUp,
  AlertTriangle,
} from "lucide-react";

export const statusConfig = {
  Available: { icon: CheckCircle, color: "bg-green-100 text-green-700" },
  Issued: { icon: CheckCircle, color: "bg-green-100 text-green-700" },
  Completed: { icon: CheckCircle, color: "bg-green-100 text-green-700" },

  Borrowed: { icon: ArrowRightLeft, color: "bg-blue-100 text-blue-700" },
  Deployed: { icon: ArrowRightLeft, color: "bg-blue-100 text-blue-700" },
  PulledOut: { icon: ArrowRightLeft, color: "bg-blue-100 text-blue-700" },

  ForRepair: { icon: Wrench, color: "bg-yellow-100 text-yellow-700" },
  UnderRepair: { icon: Hammer, color: "bg-yellow-100 text-yellow-700" },

  Pending: { icon: Clock, color: "bg-amber-100 text-amber-700" },
  OnHold: { icon: PauseCircle, color: "bg-amber-100 text-amber-700" },

  Rejected: { icon: CircleX, color: "bg-red-100 text-red-700" },
  Deleted: { icon: Trash2, color: "bg-red-100 text-red-700" },
  Disposed: { icon: Trash2, color: "bg-red-100 text-red-700" },
};

export const conditionConfig = {
  New: { icon: CheckCircle, color: "bg-green-100 text-green-700" },
  Good: { icon: ThumbsUp, color: "bg-blue-100 text-blue-700" },
  Defective: { icon: Wrench, color: "bg-yellow-100 text-yellow-700" },
  Damaged: { icon: AlertTriangle, color: "bg-red-100 text-red-700" },
};