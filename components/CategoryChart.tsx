"use client"

import { Transaction } from "@/types/transaction"
import { Separator } from "@/components/ui/separator"
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Legend } from "recharts"

const COLORS = ["#60a5fa", "#34d399", "#fbbf24", "#f87171", "#a78bfa"]

type Props = {
  transactions: Transaction[]
}

export default function CategoryChart({ transactions }: Props) {
  const grouped = transactions.reduce((acc: Record<string, number>, txn) => {
    acc[txn.category] = (acc[txn.category] || 0) + txn.amount
    return acc
  }, {})

  const data = Object.entries(grouped).map(([name, value]) => ({ name, value }))

  return (
    <>
      <h2 className="text-lg font-semibold text-blue-600 mb-4">
        🥧 Expenses by Category
      </h2>
      <Separator className="mb-4" />
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </>
  )
}
