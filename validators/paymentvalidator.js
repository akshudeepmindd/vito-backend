const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)

const payment = Joi.object().keys({
    packageId: Joi.objectId().required(),
    transactionId: Joi.string().required()
})

module.exports = {
	payment
};