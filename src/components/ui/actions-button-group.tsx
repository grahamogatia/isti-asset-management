import { SquarePen, Trash2 } from "lucide-react";
import { Button } from "./button";
import { ButtonGroup } from "./button-group";
import DeleteAlertDialog from "./delete-alert-dialog";
import FormSheet from "../layout/FormSheet";

interface ActionsButtonGroupProps {
  type: string;
  children?: React.ReactNode;
  updateForm?: React.ReactNode; // Add form component prop
}

function ActionsButtonGroup({
  type,
  children,
  updateForm,
}: ActionsButtonGroupProps) {
  return (
    <ButtonGroup className="hidden sm:flex">
      {/* Additional buttons */}
      {children}

       {/* Update */}
      <FormSheet 
      type={type}
      taskName="Update"
      button={
        <Button variant="outline">
          <SquarePen className="h-4 w-4" />
        </Button>
      }
      form={updateForm} />

      {/* Delete*/}
      <DeleteAlertDialog>
        <Button variant="outline">
          <Trash2 className="text-red-700 h-4 w-4" />
        </Button>
      </DeleteAlertDialog>
    </ButtonGroup>
  );
}

export default ActionsButtonGroup;
