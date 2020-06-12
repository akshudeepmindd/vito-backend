const Payment = require('../db/models/paymentSchema')
const responseHelper = require('../helpers/response');
const paymentValidator = require('../validators/paymentvalidator')

const userPayment = async(req, res, next) =>{
    try{
        const paymentForm = await paymentValidator.payment.validateAsync(req.body)
        const { packageId, transactionId } = paymentForm
        const { id } = req.user;
        paymentForm.userId = id;
        const newPayment = await new Payment(paymentForm).save()
        responseHelper.success(res, "Payment Successfull.", 200)
    }catch(error){
        next(error)
    }
}

module.exports = {
    userPayment
}