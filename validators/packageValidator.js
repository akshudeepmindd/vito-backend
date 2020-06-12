const Joi = require('@hapi/joi');

const packageCreate = Joi.object().keys({
  packageName: Joi.string().required(),
  cost: Joi.string().required()
});

const packageUpdate = Joi.object().keys({
	packageName: Joi.string(),
  cost: Joi.string()
});

// const login = Joi.object().keys({
// 	email: Joi.string()
// 		.email()
// 		.required(),
// 	password: Joi.string()
// 		.required()
// 		.min(6)
// 		.max(10)
// });

module.exports = {
    packageCreate,
    packageUpdate
};