import mongoose from "mongoose"

const TransactionSchema = new mongoose.Schema({
    amount: {
      type: Number,
      required: [true, "Amount is required"]
    },
    description: {
      type: String,
      required: [true, "Description is required"]
    },
    date: {
      type: Date,
      required: [true, "Date is required"]
    },
    category: {
      type: String,
      enum: ["Food", "Transport", "Shopping", "Utilities", "Other"],
      default: "Other"
    }
  },
  { timestamps: true }
)

export default mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema)
