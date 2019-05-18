import Db from "../db";

class User {
    constructor(_user) {
        this.user = _user;
    }

    async save() {
        const {
            email, firstname, lastname, password, type, isAdmin,
        } = this.user;

        const values = [email, firstname, lastname, password, type, isAdmin, false];
        const sql = "INSERT INTO USERS(email,firstname,lastname,password,type,isAdmin,verified) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *";
        const { rows } = await Db.query(sql, values);
        return rows;
    }

    static async findOne({ id }) {
        const sql = `SELECT * FROM users WHERE id='${id}'`;
        const { rows } = await Db.query(sql);
        if (rows.length) {
            return rows[0];
        }
        return {};
    }

    // eslint-disable-next-line class-methods-use-this
    async delete() {
        const { id } = this.user;
        const sql = `DELETE FROM users WHERE id='${id}' RETURNING *`;
        const { rows } = await Db.query(sql);
        if (!rows.length) {
            return {};
        }
        return rows[0];
    }

    // eslint-disable-next-line class-methods-use-this
    async updateType({ id, type }) {
        const sql = `UPDATE users SET type='${type}' WHERE id='${id}' RETURNING *`;
        const { rows } = await Db.query(sql);
        if (!rows.length) {
            return {};
        }
        return rows[0];
    }

    // eslint-disable-next-line class-methods-use-this
    async toggleAdmin({ id, isAdmin }) {
        const sql = `UPDATE users SET isAdmin='${isAdmin}' WHERE id='${id}' RETURNING *`;
        const { rows } = await Db.query(sql);
        if (!rows.length) {
            return {};
        }
        return rows[0];
    }

    static async findAll() {
        const sql = "SELECT * FROM users";
        const { rows } = await Db.query(sql);
        return rows;
    }

    static async findByEmail({ email }) {
        const sql = `SELECT * FROM users WHERE email='${email}'`;
        const { rows } = await Db.query(sql);
        if (!rows.length) {
            return {};
        }

        return rows[0];
    }

    async activate() {
        const { id } = this.user;
        const verified = true;
        const sql = `UPDATE users SET verified='${verified}' WHERE id='${id}'`;
        const { rows } = await Db.query(sql);
        if (!rows.length) {
            return {};
        }

        return rows[0];
    }
}

export default User;
