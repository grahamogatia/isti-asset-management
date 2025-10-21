import { Tabs, TabsList } from "../ui/tabs";

interface DisplayTabsByStatusProps {
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  trigger: React.ReactNode;
  content: React.ReactNode;
}

function DisplayTabsByStatus({
  selectedStatus,
  setSelectedStatus,
  trigger,
  content,
}: DisplayTabsByStatusProps) {
  return (
    <Tabs
      value={selectedStatus}
      onValueChange={setSelectedStatus}
      className="p-5"
    >
      <TabsList className="gap-2 overflow-x-auto max-w-full">
        {trigger}
      </TabsList>
      {content}
    </Tabs>
  );
}

export default DisplayTabsByStatus;
