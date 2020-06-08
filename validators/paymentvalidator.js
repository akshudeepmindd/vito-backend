const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)

const payment = Joi.object().keys({
    packageId: Joi.objectId(),
    transactionId: Joi.objectId()
})

module.exports = {
	payment
};