import { Pool } from "pg";
import dotenv from "dotenv";

import { usersTable, accountsTable, transactionsTable } from "./tables";

// pg.defaults.ssl = true;

dotenv.config();

let poolOptions;
if (process.env.DATABASE_URL) {
    poolOptions = {
        connectionString: process.env.DATABASE_URL,
    };
} else {
    poolOptions = {
        user: process.env.PGUSER,
        host: process.env.PGHOST,
        database: process.env.PGDB,
        password: process.env.PGPASS,
    };
}


class Db {
    constructor() {
        this.pool = new Pool(poolOptions);
        this.connect = async () => this.pool.connect();

        this.initDb();
    }

    async query(sql, data = []) {
        const conn = await this.connect();
        try {
            if (data.length) {
                return await conn.query(sql, data);
            }
            return await conn.query(sql);
        } catch (err) {
            return err;
        } finally {
            conn.release();
        }
    }

    // eslint-disable-next-line class-methods-use-this
    async initDb() {
        await this.query(usersTable);
        await this.query(accountsTable);
        await this.query(transactionsTable);

        // console.log("Tables initialized!");
    }
}

export default new Db();
