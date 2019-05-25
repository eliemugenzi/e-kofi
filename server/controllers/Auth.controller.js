/* eslint-disable consistent-return */
import jwt from "jsonwebtoken";
import User from "../models/User.model";

class AuthController {
    static createClient(req, res) {
        const {
            email, firstname, lastname, password,
        } = req.body;

        // eslint-disable-next-line consistent-return
        User.findByEmail({ email }).then((thatUser) => {
            if (Object.keys(thatUser).length) {
                return res.status(400).json({
                    status: 400,
                    error: "User with this email already exists",
                });
            }

            const newUser = {
                email, firstname, lastname, password, type: "client", isAdmin: false,
            };
            new User(newUser).save().then((user) => {
                jwt.sign(user, process.env.SECRET_KEY, (err, token) => {
                    res.json({
                        status: 201,
                        message: "New User Created!",
                        data: [{ token }],
                    }).status(201);
                });
            });
        });
    }

    static createStaff(req, res) {
        const {
            email, firstname, lastname, password,
        } = req.body;
        const newUser = {
            email,
            firstname,
            lastname,
            password,
            type: "staff",
            isAdmin: false,
            verified: false,
        };
        User.findByEmail({ email }).then((thatUser) => {
            if (Object.keys(thatUser).length) {
                return res.status(400).json({
                    status: 400,
                    error: "User with that email already exists!",
                });
            }
        });
        new User(newUser).save().then((user) => {
            jwt.sign(user, process.env.SECRET_KEY, (err, token) => {
                res.status(201).json({
                    status: 201,
                    message: "New user!",
                    data: [{ token }],
                });
            });
        });
    }

    static login(req, res) {
        const { email, password } = req.body;

        User.findByEmail({ email }).then((currentUser) => {
            if (Object.keys(currentUser).length) {
                if (currentUser.password === password) {
                    jwt.sign(currentUser, process.env.SECRET_KEY, (err, token) => {
                        res.status(200).json({
                            status: 200,
                            data: [{ token }],
                        });
                    });
                } else {
                    res.status(400).json({
                        status: 400,
                        error: "Invalid Email and Password",
                    });
                }
            } else {
                res.status(400).json({
                    status: 400,
                    error: "User with this email does not exist!",
                });
            }
        });
    }

    static adminRegister(req, res) {
        const {
            email, firstname, lastname, password,
        } = req.body;
        const newUser = {
            email,
            firstname,
            lastname,
            password,
            type: "staff",
            isAdmin: true,
        };
        new User(newUser).save().then((user) => {
            console.log(user);
            jwt.sign(user, process.env.SECRET_KEY, (err, token) => {
                res.status(201).json({
                    status: 201,
                    message: "New user!",
                    data: [{ token }],
                });
            });
        });
    }
}

export default AuthController;
