import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  how: {
    type: String,
    required: true,
  },
  Amount: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  uniqueId: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
});

const transactions = mongoose.model("transaction", transactionSchema);

export default transactions;
