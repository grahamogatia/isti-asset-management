import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

interface CustomToolTipProps {
    children: React.ReactNode,
    content: string,
}

function CustomToolTip({children, content}: CustomToolTipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {children}
      </TooltipTrigger>
      <TooltipContent>
        {content}
      </TooltipContent>
    </Tooltip>
  );
}

export default CustomToolTip;
