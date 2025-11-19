import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function formatNumber(n: number) {
  return new Intl.NumberFormat("en-PH").format(n);
}

interface SectionCardsProps {
  title: string;
  value: number;
  desc: string;
}

export default function SectionCard({
  title,
  value,
  desc,
  
}: SectionCardsProps) {

  return (
    <div>
      <Card key={title}>
        <CardHeader>
          <CardDescription>{title}</CardDescription>

          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-purple-800">
            {formatNumber(value)}
          </CardTitle>
        </CardHeader>

        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {desc}{" "}
            
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
