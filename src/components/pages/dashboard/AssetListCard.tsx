import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
} from "@/components/ui/table";

interface AssetListCardProps {
  title: string;
  itemsTotal: number; // list of objects that include an asset_id and a unique id
  itemsTotalColsSpan: number;
  children: React.ReactNode
}

export default function AssetListCard({
  title,
  itemsTotal,
  itemsTotalColsSpan,
  children
}: AssetListCardProps) {
  return (
    <Card className="gap-2">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>

          <TableBody>
            {children}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={itemsTotalColsSpan}>
                Total: {itemsTotal}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>

      
    </Card>
  );
}