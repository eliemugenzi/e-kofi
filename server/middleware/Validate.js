/* eslint-disable no-useless-escape */
import ValidateHelper from "../helpers/ValidateHelper";

class Validate {
    static validateUser(req, res, next) {
        const { error } = ValidateHelper.userSchema(req.body);
        if (error) {
            res.status(400).json({
                status: 400,
                // eslint-disable-next-line no-useless-escape
                error: error.details[0].message.replace(/[$\/\\#,+()$~%.'":*<>{}]/g, ""),
            });
        } else next();
    }

    static validateLogin(req, res, next) {
        const { error } = ValidateHelper.loginSchema(req.body);
        if (error) {
            res.status(400).json({
                status: 400,
                error: error.details[0].message.replace(/[$\/\\#,+()$~%.'":*<>{}]/g, ""),
            });
        } else next();
    }

    static validateAmount(req, res, next) {
        const { error } = ValidateHelper.amountSchema(req.body);
        if (error) {
            res.status(400).json({
                status: 400,
                error: error.details[0].message.replace(/[$\/\\#,+()$~%.'":*<>{}]/g, ""),
            });
        } else next();
    }
}

export default Validate;
