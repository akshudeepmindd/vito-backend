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
	role: Joi.string().allow()
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

const emailVerification = Joi.object().keys({
	token: Joi.object().required()
})

module.exports = {
	register,
	login,
	emailVerification
};