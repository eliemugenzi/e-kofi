import Db from "../db";

class Transaction {
    constructor(_transaction) {
        this.transaction = _transaction;
    }

    async save() {
        const {
            type, accountNumber, cashier, amount, oldBalance, newBalance,
        } = this.transaction;
        const values = [new Date(), type, accountNumber, cashier, amount, oldBalance, newBalance];
        const sql = "INSERT INTO transactions(createdOn,type,accountNumber,cashier,amount,oldBalance,newBalance) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *";
        const { rows } = await Db.query(sql, values);
        console.log(rows);
        if (!rows.length) {
            return {};
        }

        return rows[0];
    }

    async delete() {
        const { id } = this.transaction;
        const sql = `DELETE FROM transactions WHERE id='${id}' RETURNING *`;
        const { rows } = await Db.query(sql);
        if (!rows.length) {
            return {};
        }

        return rows[0];
    }

    static async findAll() {
        const sql = "SELECT * FROM transactions";
        const { rows } = await Db.query(sql);
        return rows;
    }

    static async findOne({ id }) {
        const sql = `SELECT * FROM transactions WHERE id='${id}'`;
        const { rows } = await Db.query(sql);
        if (!rows.length) {
            return {};
        }

        return rows[0];
    }

    static async getTransactions({ accountNumber }) {
        const sql = `SELECT * FROM transactions WHERE accountNumber='${accountNumber}'`;
        const { rows } = await Db.query(sql);
        return rows;
    }

    static async getOneTransaction({ accountNumber, transactionId }) {
        const sql = `SELECT * FROM transactions WHERE accountNumber='${accountNumber}' AND id='${transactionId}'`;
        const { rows } = await Db.query(sql);
        return rows;
    }
}

export default Transaction;
