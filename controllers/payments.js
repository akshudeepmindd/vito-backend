const Payment = require('../db/models/paymentSchema')
const responseHelper = require('../helpers/response');
const paymentValidator = require('../validators/paymentvalidator')

const payment = async(req, res, next) =>{
    try{
        const { userId, transactionId, packageId } = req.body
        const { id } = req.user;
        const newPayment = await new Payment({
            userId,
            transactionId,
            packageId
        })

        // const payments = await Payment.findOne({packageName})
        // if(packages){
        //     throw Error('Package already exist.')
        // }

        const newPayments = await newPayment.save()
        responseHelper.success(res, newPayments, 200)
    }catch(error){
        next(error)
    }
}