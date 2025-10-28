import type { Tab } from "@/data/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface DisplayTabsByStatusProps {
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  tabs: Tab[];
  children: React.ReactNode;
}

function DisplayTabsByStatus({
  selectedStatus,
  setSelectedStatus,
  tabs,
  children,
}: DisplayTabsByStatusProps) {
  return (
    <Tabs
      value={selectedStatus}
      onValueChange={setSelectedStatus}
      className="p-4 pt-2"
    >
      <TabsList className="gap-2 overflow-x-auto max-w-full">
        {tabs.map((t) => (
          <TabsTrigger
            key={t.value}
            value={t.value}
            className="whitespace-nowrap flex-shrink-0 data-[state=active]:font-bold"
          >
            {t.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((t) => (
        <TabsContent
          key={t.value}
          value={t.value}
          className="mx-auto w-full border rounded-xl py-3.5 p-5"
        >
          {children}
        </TabsContent>
      ))}
    </Tabs>
  );
}

export default DisplayTabsByStatus;
