import { Card, CardContent } from "@/components/ui/card"

interface StatCardProps {
  count: number;
  label: string;
  className?: string;
}

const StatCard = ({ count, label, className }: StatCardProps) => {
  return (
    <Card className={className}>
      <CardContent className="flex flex-col gap-y-4">
        <p className="text-5xl font-bold">{count < 10 ? `0${count}` : count}</p>
        <p className="font-medium text-lg">{label}</p>
      </CardContent>
    </Card>
  )
}

export default StatCard;