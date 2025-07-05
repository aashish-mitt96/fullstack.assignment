"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

type Props = {
  amount: string
  description: string
  date: string
  editMode: boolean
  openDialog: boolean
  category: string
  setCategory: (value: string) => void
  setOpenDialog: (value: boolean) => void
  setAmount: (value: string) => void
  setDescription: (value: string) => void
  setDate: (value: string) => void
  onSubmit: () => void
}

export default function TransactionDialog({
  amount,
  description,
  date,
  editMode,
  openDialog,
  category,
  setCategory,
  setOpenDialog,
  setAmount,
  setDescription,
  setDate,
  onSubmit,
}: Props) {
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <div className="flex justify-between items-center my-1">
        <h2 className="text-lg font-semibold text-gray-700">
          {editMode ? "✏️ Edit Transaction" : "📥 Add Transaction"}
        </h2>
        <DialogTrigger asChild>
          <Button className="bg-blue-500 text-white hover:bg-blue-600">
            {editMode ? "Edit" : "Add New"}
          </Button>
        </DialogTrigger>
      </div>

      <DialogContent className="sm:max-w-[700px] ">
        <DialogHeader>
          <DialogTitle className="text-blue-600">
            {editMode ? "Edit Your Entry" : "Add New Expense"}
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
          <div>
            <Label className="mb-2">💰 Amount</Label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="₹0.00"
            />
          </div>
          <div>
            <Label className="mb-2">📝 Description</Label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Rent, Food"
            />
          </div>
          <div>
            <Label className="mb-2">📅 Date</Label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
        <Label className="mb-2">📂 Category</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Food">Food</SelectItem>
            <SelectItem value="Transport">Transport</SelectItem>
            <SelectItem value="Shopping">Shopping</SelectItem>
            <SelectItem value="Utilities">Utilities</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
        </div>
        <div className="flex justify-end">
          <Button
            className="bg-blue-500 text-white hover:bg-blue-600"
            onClick={onSubmit}
          >
            {editMode ? "Save Changes" : "Add"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
