import express from "express";
import bodyParser from "body-parser";
import userRouter from "./server/routes/User.route";
import accountRouter from "./server/routes/Account.route";
import transactionRouter from "./server/routes/Transaction.route";
import authRouter from "./server/routes/Auth.route";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/accounts", accountRouter);
app.use("/api/v1/transactions", transactionRouter);
app.use("/api/v1/auth", authRouter);
app.get("/", (req, res) => {
    res.json({
        message: "Hello World",
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

export default app;
