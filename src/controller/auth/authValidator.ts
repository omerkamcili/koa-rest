const validate = require('koa-joi-validate')
const Joi = require('joi')

const registerValidator = validate({
    body: {
        email: Joi.string().required(),
        name: Joi.string().required(),
        phone: Joi.string().required(),
        password: Joi.string().required()
    }
});

const loginValidator = validate({
    body: {
        email: Joi.string().required(),
        password: Joi.string().required()
    }
});

export { registerValidator, loginValidator };