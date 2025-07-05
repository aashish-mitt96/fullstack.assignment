"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CalendarIcon, EditIcon, Trash2Icon } from "lucide-react"

type Transaction = {
  _id: string
  amount: number
  description: string
  date: string
}

type Props = {
  transactions: Transaction[]
  onEdit: (txn: Transaction) => void
  onDelete: (id: string) => void
}

export default function TransactionList({ transactions, onEdit, onDelete }: Props) {
  return (
    <>
      <h2 className="text-lg font-semibold text-blue-600 mb-4">
        📋 Transactions list
      </h2>
      <Separator className="mb-4" />
      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
        {transactions.length === 0 ? (
          <p className="text-sm text-gray-500">No transactions added yet.</p>
        ) : (
          transactions.map((txn) => (
            <div
              key={txn._id}
              className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100"
            >
              <div>
                <p className="text-base font-medium text-blue-800">
                  ₹{txn.amount}
                </p>
                <p className="text-sm text-gray-600">{txn.description}</p>
                <p className="text-xs flex items-center gap-1 text-gray-400">
                  <CalendarIcon className="h-3 w-3" />
                  {new Date(txn.date).toDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onEdit(txn)}
                  className="flex gap-1 items-center text-sm"
                >
                  <EditIcon className="w-4 h-4" /> Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDelete(txn._id)}
                  className="flex gap-1 items-center text-sm"
                >
                  <Trash2Icon className="w-4 h-4" /> Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  )
}
