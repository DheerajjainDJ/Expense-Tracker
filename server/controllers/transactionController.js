import transactions from "../model/transactionModel.js";

export const addTransactionController = async (req, res) => {
  try {
    const newTransaction = new transactions({
      ...req.body,
      owner: req.userId,
    });
    await newTransaction.save();
    res.status(201).send(newTransaction);
  } catch (error) {
    res.status(500).send({ "add transaction error": error.message });
  }
};

export const getTransactionsController = async (req, res) => {
  try {
    const allTransactions = await transactions.find({
      owner: req.userId,
    });
    res.status(200).send(allTransactions);
  } catch (error) {
    res.status(500).send({ "Getting transaction Error": error.message });
  }
};

export const deleteTransactionController = async (req, res) => {
  try {
    const transaction = await transactions.findOneAndDelete({
      id: req.params.id,
      owner: req.userId,
    });
    if (!transaction) {
      return res.status(404).send();
    }
    res.status(200).send();
  } catch (error) {
    res.status(501).send({ "transaction Error": error.message });
  }
};
