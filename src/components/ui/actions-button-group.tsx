import { SquarePen, Trash2 } from "lucide-react";
import { Button } from "./button";
import { ButtonGroup } from "./button-group";
import CustomToolTip from "./custom-tooltip";
import DeleteAlertDialog from "./delete-alert-dialog";

interface ActionsButtonGroupProps {
  type: string;
  children?: React.ReactNode;
}

function ActionsButtonGroup({ type, children }: ActionsButtonGroupProps) {
  return (
    <ButtonGroup className="hidden sm:flex">
      {children} {/* Use custom tooltip */}
      <CustomToolTip content="Update Asset">
        <Button variant="outline">
          <SquarePen />
        </Button>
      </CustomToolTip>
      <CustomToolTip content="Delete Asset">
        <DeleteAlertDialog>
          <Button variant="outline">
            <Trash2 className="text-red-700" />
          </Button>
        </DeleteAlertDialog>
      </CustomToolTip>
    </ButtonGroup>
  );
}

export default ActionsButtonGroup;
