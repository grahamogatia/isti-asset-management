import { DataTable } from "@/components/ui/data-table";
import { columns, type Payment } from "@/data/columns";

function Dashboard() {
  const data: Payment[] = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "page1@example.com",
    },
    {
      id: "728ed52g",
      amount: 11231241410,
      status: "processing",
      email: "y@example.com",
    },
  ];

  return (
    <div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}

export default Dashboard;
