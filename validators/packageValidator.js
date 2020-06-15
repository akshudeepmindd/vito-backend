const Joi = require('@hapi/joi');

const packageCreate = Joi.object().keys({
  packageName: Joi.string().required(),
  cost: Joi.string().required()
});

const packageUpdate = Joi.object().keys({
	packageName: Joi.string(),
  cost: Joi.string()
});


module.exports = {
    packageCreate,
    packageUpdate
};