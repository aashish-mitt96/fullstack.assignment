"use client"

import { Separator } from "@/components/ui/separator"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

type ChartItem = {
  name: string
  total: number
}

type Props = { chartData: ChartItem[] }

export default function MonthlyChart({ chartData }: Props) {
  return (
    <>
      <h2 className="text-lg font-semibold text-blue-600 mb-4">
        📊 Monthly Expenses
      </h2>
      <Separator className="mb-4" />
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" stroke="#3b82f6" />
          <YAxis stroke="#3b82f6" />
          <Tooltip />
          <Bar dataKey="total" fill="#60a5fa" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}
