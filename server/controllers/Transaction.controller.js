import Transaction from "../models/Transaction.model";
import Account from "../models/Account.model";

class TransactionController {
    static getTransactions(req, res) {
        const { accountNumber } = req.params;
        Account.findOne({ accountNumber }).then((account) => {
            if (Object.keys(account).length) {
                Transaction.getTransactions({ accountNumber }).then((transactions) => {
                    res.json({
                        status: 200,
                        data: transactions,
                    });
                });
            } else {
                res.status(400).json({
                    status: 400,
                    error: "This account does not exist!",
                });
            }
        });
    }

    static getTransaction(req, res) {
        const { accountNumber, transactionId } = req.params;
        Account.findOne({ accountNumber }).then((account) => {
            if (Object.keys(account).length) {
                // eslint-disable-next-line max-len
                Transaction.getOneTransaction({ accountNumber, transactionId }).then((transaction) => {
                    if (Object.keys(transaction).length) {
                        res.json({
                            status: 200,
                            data: transaction,
                        });
                    } else {
                        res.status(404).json({
                            status: 404,
                            error: "This transaction is not found!",
                        });
                    }
                });
            } else {
                res.status(404).json({
                    status: 404,
                    error: "This account does not exist!",
                });
            }
        });
    }

    static getOne(req, res) {
        const { id } = req.params;
        Transaction.findOne({ id }).then((transaction) => {
            if (Object.keys(transaction).length) {
                res.json({
                    status: 200,
                    data: transaction,
                });
            } else {
                res.status(404).json({
                    status: 404,
                    error: "Transaction is  not available!",
                });
            }
        });
    }

    static getAll(req, res) {
        Transaction.findAll().then((transactions) => {
            res.json({
                status: 200,
                data: transactions,
            });
        });
    }
}

export default TransactionController;
