import Db from "../db";

class Account {
    constructor(_account) {
        this.account = _account;
    }

    async save() {
        const { accountNumber, owner, type } = this.account;
        const sql = "INSERT INTO accounts(accountNumber,createdOn,owner,type,status,balance) VALUES($1,$2,$3,$4,$5,$6) RETURNING *";
        const values = [accountNumber, new Date(), owner, type, "active", 0.00];
        const { rows } = await Db.query(sql, values);
        if (!rows.length) {
            return {};
        }
        return rows[0];
    }

    static async findOne({ accountNumber }) {
        const sql = `SELECT * FROM accounts WHERE accountNumber='${accountNumber}'`;
        const { rows } = await Db.query(sql);
        if (!rows.length) {
            return {};
        }

        return rows[0];
    }

    static async findOneByYou({ id, accountNumber }) {
        const sql = `SELECT * FROM accounts WHERE accountNumber='${accountNumber}' AND owner='${id}'`;
        const { rows } = await Db.query(sql);
        if (!rows.length) {
            return {};
        }
        return rows[0];
    }

    static async findAll() {
        const sql = "SELECT * FROM accounts";
        const { rows } = await Db.query(sql);
        return rows;
    }

    // eslint-disable-next-line class-methods-use-this
    async delete() {
        const { accountNumber } = this.account;
        const sql = `DELETE FROM accounts WHERE accountNumber='${accountNumber}' RETURNING *`;
        const { rows } = await Db.query(sql);
        if (!rows.length) {
            return {};
        }
        return rows[0];
    }

    async changeAmount({ amount }) {
        const { accountnumber } = this.account;
        console.log(accountnumber);
        console.log(amount);
        const sql = `UPDATE accounts SET balance='${amount}' WHERE accountnumber='${accountnumber}' RETURNING *`;
        const { rows } = await Db.query(sql);
        console.log(rows);
        if (!rows.length) {
            return {};
        }
        return rows[0];
    }

    static async findByOwner({ owner }) {
        const sql = `SELECT * FROM accounts WHERE owner='${owner}'`;
        const { rows } = await Db.query(sql);
        return rows;
    }

    async changeStatus({ status }) {
        const { accountNumber } = this.account;
        const sql = `UPDATE accounts SET status='${status}' WHERE accountNumber='${accountNumber}' RETURNING *`;
        const { rows } = await Db.query(sql);
        if (!rows.length) {
            return {};
        }

        return rows[0];
    }

    static async findByStatus({ status }) {
        const sql = `SELECT * FROM accounts WHERE status='${status}'`;
        const { rows } = await Db.query(sql);
        return rows;
    }
}

export default Account;
