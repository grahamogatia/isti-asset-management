import { SquarePen, Trash2, Undo2 } from "lucide-react";
import { Button } from "./button";
import { ButtonGroup } from "./button-group";
import CustomToolTip from "./custom-tooltip";

interface ActionsButtonGroupProps {
  type: string;
  children?: React.ReactNode
}

function ActionsButtonGroup({ type, children }: ActionsButtonGroupProps) {
  return (
    <ButtonGroup className="hidden sm:flex">
      {children} {/* Use custom tooltip */}
      <CustomToolTip content="Update Asset">
        <Button variant="outline"><SquarePen/></Button>
      </CustomToolTip>
      <CustomToolTip content="Delete Asset">
        <Button variant="outline"><Trash2 className="text-color-red-500"/></Button>
      </CustomToolTip>
    </ButtonGroup>
  );
}

export default ActionsButtonGroup;
