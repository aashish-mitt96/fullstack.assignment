"use client"

import axios from "axios"
import { useEffect, useState } from "react"

import Header from "@/components/Header"
import { Card } from "@/components/ui/card"
import MonthlyChart from "@/components/MonthlyChart"
import TransactionList from "@/components/TransactionList"
import TransactionDialog from "@/components/TransactionDialog"
import Summary from "@/components/Summary"
import CategoryChart from "@/components/CategoryChart"

import { Transaction } from "@/types/transaction"

export default function HomePage() {
  // Form input states.
  const [date, setDate] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("Other")
  const [description, setDescription] = useState("")

  const [transactions, setTransactions] = useState<Transaction[]>([])

  // Edit state & dialog state.
  const [editMode, setEditMode] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [editingTxn, setEditingTxn] = useState<Transaction | null>(null)

  // Fetch transactions once component is mounted.
  useEffect(() => {
    fetchTransactions()
  }, [])

  async function fetchTransactions() {
    const res = await axios.get("/api/transactions")
    setTransactions(res.data)
  }

  // Add or update transaction.
  async function addTransaction() {
    if (!amount || !description || !date)
      return alert("All fields are required")

    if (editMode && editingTxn) {
      // Edit existing transaction
      await axios.put("/api/transactions", {
        id: editingTxn._id,
        amount: parseFloat(amount),
        description,
        date,
        category,
      })
      setEditMode(false)
      setEditingTxn(null)
    } else {
      // Add new transaction
      await axios.post("/api/transactions", {
        amount: parseFloat(amount),
        description,
        date,
        category,
      })
    }

    // Clear form
    setAmount("")
    setDescription("")
    setDate("")
    setCategory("Other")
    setOpenDialog(false)
    fetchTransactions()
  }

  // Delete transaction by ID.
  function deleteTransaction(id: string) {
    axios.delete("/api/transactions", { data: { id } }).then(fetchTransactions)
  }

  // Load transaction data into form for editing.
  function openEditForm(txn: Transaction) {
    setEditMode(true)
    setEditingTxn(txn)
    setAmount(String(txn.amount))
    setDescription(txn.description)
    setDate(txn.date.split("T")[0])
    setCategory(txn.category || "Other")
    setOpenDialog(true)
  }

  // Prepare monthly summary data for bar chart.
  const chartData = transactions.reduce<{ name: string; total: number }[]>((acc, txn) => {
    const month = new Date(txn.date).toLocaleString("default", { month: "short" })
    const found = acc.find((a) => a.name === month)
    if (found) {
      found.total += txn.amount
    } else {
      acc.push({ name: month, total: txn.amount })
    }
    return acc
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white p-6">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* App Header */}
        <Header />

        {/* Summary Cards */}
        <Summary transactions={transactions} />

        {/* Transaction Form Dialog (Add/Edit) */}
        <Card className="p-6 bg-white/80 backdrop-blur rounded-2xl shadow-md border border-gray-200">
          <TransactionDialog
            amount={amount}
            description={description}
            date={date}
            category={category}
            editMode={editMode}
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
            setAmount={setAmount}
            setDescription={setDescription}
            setDate={setDate}
            setCategory={setCategory}
            onSubmit={addTransaction}
          />
        </Card>

        {/* Main Content: Transaction List + Charts */}
        <div className="flex flex-col md:flex-row gap-6">
          <Card className="p-6 bg-white/80 rounded-2xl shadow-sm border border-gray-200 w-full md:w-1/2">
            <TransactionList
              transactions={transactions}
              onEdit={openEditForm}
              onDelete={deleteTransaction}
            />
          </Card>

          <Card className="p-6 bg-white/80 rounded-2xl shadow-sm border border-gray-200 w-full md:w-1/2">
            <MonthlyChart chartData={chartData} />
          </Card>
        </div>

        {/* Category Chart */}
        <Card className="p-6 bg-white/80 rounded-2xl shadow-sm border border-gray-200">
          <CategoryChart transactions={transactions} />
        </Card>
      </div>
    </div>
  )
}
