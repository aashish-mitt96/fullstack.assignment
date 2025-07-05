import { NextResponse } from "next/server"

import { connectDB } from "@/config/db"
import Transaction from "@/models/transaction"


// Fetch all transactions
export async function GET() {
  try {
    await connectDB()
    const transactions = await Transaction.find().sort({ date: -1 })
    return NextResponse.json(transactions)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    console.error("GET /api/transactions error:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}


// Create a new transaction
export async function POST(req: Request) {
  try {
    await connectDB()
    const body = await req.json()
    const transaction = await Transaction.create(body)
    return NextResponse.json(transaction, { status: 201 })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    console.error("POST /api/transactions error:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}


// Update an existing transaction
export async function PUT(req: Request) {
  try {
    await connectDB();
    const { id, amount, description, date, category } = await req.json()
    const updated = await Transaction.findByIdAndUpdate(
      id,
      { amount, description, date, category },
      { new: true }
    )
    return NextResponse.json(updated)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    console.error("PUT /api/transactions error:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}


// Delete a transaction
export async function DELETE(req: Request) {
  try {
    await connectDB()
    const { id } = await req.json()
    await Transaction.findByIdAndDelete(id)
    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    console.error("DELETE /api/transactions error:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}


