import { Trash2 } from "lucide-react";
import { Button } from "./button";
import { ButtonGroup } from "./button-group";
import DeleteAlertDialog from "./delete-alert-dialog";

interface ActionsButtonGroupProps {
  type: string;
  children?: React.ReactNode;
}

function ActionsButtonGroup({
  type,
  children
}: ActionsButtonGroupProps) {
  return (
    <ButtonGroup className="hidden sm:flex">
      {/* Additional buttons */}
      {children}


      {/* Delete*/}
      <DeleteAlertDialog type={type}>
        <Button variant="outline">
          <Trash2 className="text-red-700 h-4 w-4" />
        </Button>
      </DeleteAlertDialog>
    </ButtonGroup>
  );
}

export default ActionsButtonGroup;