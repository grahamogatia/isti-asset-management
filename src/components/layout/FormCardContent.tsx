import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function FormCardContent({title, children}: {title: string, children: React.ReactNode}) {
  return (
    <Card className="w-full py-4 gap-2 pb-8">
      <CardHeader className="">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 ">
        {children}
      </CardContent>
    </Card>
  )
}

export default FormCardContent;