import Chance from "chance";
import Account from "../models/Account.model";
import User from "../models/User.model";
import Transaction from "../models/Transaction.model";

class AccountController {
    static createAccount(req, res) {
        const { id } = req.user;
        const chance = new Chance();
        const accountNumber = chance.cc();
        User.findOne({ id }).then((currentUser) => {
            if (Object.keys(currentUser).length) {
                const newAccount = new Account({
                    accountNumber,
                    owner: currentUser.id,
                    type: "current",
                });
                newAccount.save().then((account) => {
                    res.status(201).json({
                        status: 201,
                        message: "New Account!",
                        data: account,
                    });
                });
            } else {
                res.status(400).json({
                    status: 400,
                    error: "You are trying to create an account for a non-existing user!",
                });
            }
        });
    }

    static createSavingOne(req, res) {
        const { id } = req.user;
        const chance = new Chance();
        const accountNumber = chance.cc();
        User.findOne({ id }).then((currentUser) => {
            if (Object.keys(currentUser).length) {
                const newAccount = new Account({
                    accountNumber,
                    owner: currentUser.id,
                    type: "saving",
                });
                newAccount.save().then((account) => {
                    res.status(201).json({
                        status: 201,
                        message: "New Account!",
                        data: account,
                    });
                });
            } else {
                res.status(400).json({
                    status: 400,
                    error: "You are trying to create an account with a non-existing user!",
                });
            }
        });
    }

    static debit(req, res) {
        const { amount } = req.body;
        const { id } = req.user;
        const { accountNumber } = req.params;
        // eslint-disable-next-line consistent-return
        User.findOne({ id }).then((user) => {
            if (Object.keys(user).length) {
                console.log(user);
                if (user.type !== "staff") {
                    return res.status(403).json({
                        status: 403,
                        error: "You are not allowed to do this!",
                    });
                }
                Account.findOne({ accountNumber }).then((account) => {
                    if (Object.keys(account).length) {
                        if (parseFloat(account.balance) < parseFloat(amount)) {
                            res.status(400).json({
                                status: 400,
                                error: "Insufficient balance",
                            });
                        } else {
                            console.log(account);
                            const newAmount = parseFloat(account.balance) - parseFloat(amount);
                            const currentAccount = new Account(account);
                            // eslint-disable-next-line max-len
                            currentAccount.changeAmount({ amount: parseFloat(newAmount) }).then((result) => {
                                console.log(result);
                                const newTransaction = new Transaction({
                                    type: "debit",
                                    accountNumber,
                                    cashier: id,
                                    amount,
                                    oldBalance: parseFloat(account.balance),
                                    newBalance: parseFloat(newAmount),
                                });
                                newTransaction.save().then((transaction) => {
                                    res.json({
                                        status: 200,
                                        message: "Debited successfully!",
                                        data: transaction,
                                    });
                                }).catch(err => console.log(err));
                            });
                        }
                    } else {
                        res.status(400).json({
                            status: 400,
                            error: "Account does not exist!",
                        });
                    }
                });
            } else {
                res.status(404).json({
                    status: 404,
                    error: "User does not exist!",
                });
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    static credit(req, res) {
        const { amount } = req.body;
        const { accountNumber } = req.params;
        const { id } = req.user;
        // eslint-disable-next-line consistent-return
        User.findOne({ id }).then((user) => {
            if (Object.keys(user).length) {
                if (user.type !== "staff") {
                    return res.status(403).json({
                        status: 403,
                        error: "You are not allowed to do this!",
                    });
                }
            }
        });
        Account.findOne({ accountNumber }).then((account) => {
            if (Object.keys(account).length) {
                console.log(account);
                const newAmount = parseFloat(account.balance) + parseFloat(amount);
                console.log(newAmount);
                const currentAccount = new Account(account);
                currentAccount.changeAmount({ amount: newAmount }).then((result) => {
                    console.log(result);
                    const newTransaction = new Transaction({
                        type: "credit",
                        accountNumber,
                        cashier: id,
                        amount,
                        oldBalance: parseFloat(account.balance),
                        newBalance: parseFloat(newAmount),
                    });
                    newTransaction.save().then((transaction) => {
                        res.json({
                            status: 200,
                            message: "Credited successfully",
                            data: transaction,
                        });
                    }).catch(err => console.log(err));
                }).catch((err) => {
                    console.log(err);
                });
            } else {
                res.status(400).json({
                    status: 400,
                    error: "Account does not exist!",
                });
            }
        });
    }

    static filterAccounts(req, res) {
        const { status } = req.query;
        if (status === "active") {
            Account.findByStatus({ status }).then((accounts) => {
                res.json({
                    status: 200,
                    data: accounts,
                });
            });
        } else if (status === "dormant") {
            Account.findByStatus({ status }).then((accounts) => {
                res.json({
                    status: 200,
                    data: accounts,
                });
            });
        } else {
            Account.findAll().then((accounts) => {
                res.json({
                    status: 200,
                    data: accounts,
                });
            });
        }
    }

    static getAccounts(req, res) {
        const { id } = req.user;
        Account.findByOwner({ owner: id }).then((accounts) => {
            res.json({
                status: 200,
                data: accounts,
            });
        });
    }

    static getAccount(req, res) {
        const { id } = req.params;
        const { accountNumber } = req.params;
        Account.findOneByYou({ id, accountNumber }).then((account) => {
            if (Object.keys(account).length) {
                res.json({
                    status: 200,
                    data: account,
                });
            } else {
                res.status(404).json({
                    status: 404,
                    error: "Account Not found",
                });
            }
        });
    }

    static deleteAccount(req, res) {
        const { id } = req.user;
        User.findOne({ id }).then((user) => {
            if (Object.keys(user).length) {
                if (user.isAdmin) {
                    const { accountNumber } = req.params;
                    Account.findOne({ accountNumber }).then((account) => {
                        if (Object.keys(account).length) {
                            const currentAccount = new Account(account);
                            currentAccount.delete().then((result) => {
                                res.json({
                                    status: 200,
                                    message: "Account deleted!",
                                    data: result,
                                });
                            });
                        } else {
                            res.status(400).json({
                                status: 400,
                                error: "Account is not available!",
                            });
                        }
                    });
                } else {
                    res.status(403).json({
                        status: 403,
                        error: "You are not allowed to do this!",
                    });
                }
            } else {
                res.status(400).json({
                    status: 400,
                    error: "You are not available in your system!",
                });
            }
        });
    }

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
                res.status(404).json({
                    status: 404,
                    error: "Account not available!",
                });
            }
        });
    }
}

export default AccountController;
