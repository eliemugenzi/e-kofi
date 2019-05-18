import User from "../models/User.model";
import Account from "../models/Account.model";

class UserController {
    static getAll(req, res) {
        User.findAll().then((result) => {
            res.json({
                status: 200,
                data: result,
            });
        });
    }

    static getOne(req, res) {
        const { id } = req.params;
        User.findOne({ id }).then((user) => {
            if (Object.keys(user).length) {
                res.json({
                    status: 200,
                    data: user,
                });
            } else {
                res.status(404).json({
                    status: 404,
                    error: "User not available",
                });
            }
        });
    }

    static getAccounts(req, res) {
        const { id } = req.params;
        User.findOne({ id }).then((user) => {
            if (Object.keys(user).length) {
                Account.findByOwner({ owner: id }).then((accounts) => {
                    res.json({
                        status: 200,
                        data: accounts,
                    });
                });
            } else {
                res.status(404).json({
                    status: 404,
                    error: "You can't ask me accounts for non-existing user!",
                });
            }
        });
    }

    static activateStaff(req, res) {
        const { id } = req.user;
        const { userId } = req.params;
        User.findOne({ id }).then((user) => {
            if (Object.keys(user).length) {
                if (user.isadmin) {
                    User.findOne({ id: userId }).then((yuzer) => {
                        if (Object.keys(yuzer).length) {
                            const currentUser = new User(yuzer);
                            currentUser.activate().then((yuuzer) => {
                                res.json({
                                    status: 200,
                                    message: "This user becomes a cashier",
                                    data: yuuzer,
                                });
                            });
                        } else {
                            res.status(404).json({
                                status: 404,
                                error: "User not found!",
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
                    error: "User does not exist!",
                });
            }
        });
    }
}

export default UserController;
