import dotenv from "dotenv";

dotenv.config();

export default {
    development: {
        username: process.env.PGUSER,
        password: process.env.PGPASS,
        database: process.env.PGDB,
        host: process.env.PGHOST,
        dialect: "postgres",
        logging: false,
    },
    test: {
        username: process.env.PGUSER,
        password: process.env.PGPASS,
        database: process.env.PGDB,
        host: process.env.PGHOST,
        dialect: "postgres",
        logging: false,
    },
    production: {
        username: process.env.PGUSER,
        password: process.env.PGPASS,
        database: process.env.PGDB,
        host: process.env.PGHOST,
        dialect: "postgres",
        logging: false,
    },
};
