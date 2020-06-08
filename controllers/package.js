const Package = require('../db/models/packegSchema');
const responseHelper = require('../helpers/response');
const packageValidator = require('../validators/packageValidator')

const createPackage = async(req, res, next) => {
    try{
        const packageForm = await packageValidator.packageCreate(req.body) 
        const { packageName, cost } = packageForm
        const packages = await Package.findOne({packageName})
        if(packages){
            throw Error('Package already exist.')
        }
        const newPackages = await new Package({packageForm}).save()
        // await newPackage.save()
        responseHelper.data(res, newPackages, 200)
    }catch(error){
        next(error)
    }
}

const editPackage = async(req, res, next) => {
    try{
        const{ packageId } = req.params
        const packageForm = await packageValidator.packageUpdate(req.body)
        const{ packageName, cost } = packageForm

        const response = await Package.updateOne(
            { _id: packageId },
            {$set:packageForm}
            )
        responseHelper.data(res, response, 200)
    }catch(error){
        next(error)
    }
}

const getPackage = async(req, res, next) => {
    try{
        const{ packageId } = req.params
        const response = await Package.findOne(
            { _id: packageId }
            )
        responseHelper.data(res, response, 200)
    }catch(error){
        next(error)
    }
}

const getAllPackage = async(req, res, next) => {
    try{
        const response = await Package.find()
        responseHelper.data(res, response, 200)
    }catch(error){
        next(error)
    }
}

const removePackage = async(req, res, next) => {
    try{
        const{ packageId } = req.params
        const response = await Package.deleteOne(
            { _id: packageId }
        )
        responseHelper.success(res, "Plane remove succfully.", 200)
    }catch(error){
        next(error)
    }
}

module.exports = {
    createPackage,
    editPackage,
    getPackage,
    getAllPackage,
    removePackage
};