const Joi = require('@hapi/joi');

const register = Joi.object().keys({
	email: Joi.string()
		.email()
		.required(),
	password: Joi.string()
		.required()
		.min(6)
        .max(10),
	userName: Joi.string()
		.required(),
    firstName: Joi.string(),
    lastName:Joi.string(),
});

const login = Joi.object().keys({
	email: Joi.string()
		.email()
		.required(),
	password: Joi.string()
		.required()
		.min(6)
		.max(10)
});

module.exports = {
	register,
	login
};