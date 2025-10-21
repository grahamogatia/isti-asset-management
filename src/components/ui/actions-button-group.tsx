
import { ButtonGroup } from "./button-group";

interface ActionsButtonGroupProps {
  type: string;
  children?: React.ReactNode;
}

function ActionsButtonGroup({
  children
}: ActionsButtonGroupProps) {
  return (
    <ButtonGroup className="hidden sm:flex">
      {/* Additional buttons */}
      {children}


      
    </ButtonGroup>
  );
}

export default ActionsButtonGroup;