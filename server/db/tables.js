export const usersTable = `
  CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(50) UNIQUE,
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    password VARCHAR(20) NOT NULL,
    type VARCHAR(10) NOT NULL,
    isAdmin BOOLEAN DEFAULT FALSE,
    verified BOOLEAN DEFAULT FALSE
  )
`;

export const accountsTable = `
CREATE TABLE IF NOT EXISTS accounts(
id SERIAL PRIMARY KEY,
accountNumber VARCHAR(100) UNIQUE,
createdOn DATE NOT NULL,
owner SERIAL REFERENCES users(id) ON DELETE CASCADE,
type VARCHAR(20) NOT NULL,
status VARCHAR(30) NOT NULL,
balance NUMERIC(15,5) NOT NULL
)
`;

export const transactionsTable = `
CREATE TABLE IF NOT EXISTS transactions(
    id SERIAL PRIMARY KEY,
    createdOn DATE NOT NULL,
    type VARCHAR(20) NOT NULL,
    accountNumber VARCHAR(100) NOT NULL,
    cashier SERIAL,
    amount NUMERIC(15,5) NOT NULL,
    oldBalance NUMERIC(15,5) NOT NULL,
    newBalance NUMERIC(15,5) NOT NULL
)
`;
