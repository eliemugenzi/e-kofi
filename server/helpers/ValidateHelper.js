import Joi from "joi";

class ValidateHelper {
    static userSchema(user) {
        const schema = Joi.object().keys({
            firstname: Joi.string().required(),
            lastname: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().regex(/[a-zA-Z0-9]{6,15}/).required(),
        });
        return Joi.validate(user, schema);
    }

    static loginSchema(user) {
        const schema = Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().regex(/[a-zA-Z0-9]{6,15}/).required(),
        });
        return Joi.validate(user, schema);
    }

    static amountSchema(amount) {
        const schema = Joi.object().keys({
            amount: Joi.number().required(),
        });

        return Joi.validate(amount, schema);
    }
}

export default ValidateHelper;
