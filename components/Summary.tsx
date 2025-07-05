"use client"
import { Transaction } from "@/types/transaction"


type Props = {
  transactions: Transaction[]
}

export default function Summary({ transactions }: Props) {
  const total = transactions.reduce((sum, t) => sum + t.amount, 0)

  const categoryTotals = transactions.reduce((acc: Record<string, number>, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount
    return acc
  }, {})

  const topCategory = (Object.entries(categoryTotals) as [string, number][])
    .sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A"

  const latest = transactions[0]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
      <div className="p-4 bg-white rounded-lg shadow-sm border">
        <p className="text-xs text-gray-500">Total Expenses</p>
        <p className="text-xl font-semibold">₹{total.toFixed(2)}</p>
      </div>
      <div className="p-4 bg-white rounded-lg shadow-sm border">
        <p className="text-xs text-gray-500">Top Category</p>
        <p className="text-lg font-medium">{topCategory}</p>
      </div>
      <div className="p-4 bg-white rounded-lg shadow-sm border">
        <p className="text-xs text-gray-500">Latest Transaction</p>
        <p className="text-sm">{latest?.description || "N/A"} - ₹{latest?.amount}</p>
      </div>
    </div>
  )
}
