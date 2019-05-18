import jwt from "jsonwebtoken";

class Auth {
    static verifyToken(req, res, next) {
        const bearerHeader = req.headers.authorization;
        if (typeof bearerHeader !== "undefined") {
            const bearer = bearerHeader.split(" ");
            const bearerToken = bearer[1];
            req.token = bearerToken;

            jwt.verify(req.token, process.env.SECRET_KEY, (err, userData) => {
                if (err) {
                    res.status(401).json({
                        status: 401,
                        error: "Invalid Token",
                    });
                } else {
                    req.user = userData;
                    next();
                }
            });
        } else {
            res.status(401).json({
                status: 401,
                error: "You are not authenticated!",
            });
        }
    }
}

export default Auth;
