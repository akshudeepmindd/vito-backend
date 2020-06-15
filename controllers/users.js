const User = require('../db/models/userSchema');
const userValidator = require('../validators/userValidator');
const jwtHelper = require('../helpers/jwt');
const responseHelper = require('../helpers/response');
const Token = require('../db/models/tokenSchema')
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer')
const crypto = require('crypto');
const SendMail = require('../helpers/nodemailer')

const register = async (req, res, next) =>{
    try{
		
		const userForm = await userValidator.register.validateAsync(req.body);
		console.log(userForm, "userForm")
		const { firstName, lastName, userName, email } = userForm;
        const user = await User.findOne({ email });
        if(user){
            throw Error('Email is not unique.');
        }
		const users = await new User(userForm).save();

		// new Token()
		const verifiedToken = new Token({ userId: users._id, token: crypto.randomBytes(16).toString('hex') });
		await verifiedToken.save(verifiedToken)

		// await ()
		let subject = 'Account Verification Token'
		let userMail = users.email
		let text = 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + verifiedToken.token + '.\n'
		console.log(userMail)
		await SendMail.sendmail(req, res, userMail, subject, text)
        responseHelper.success(res, `user created successfully a verification link send to ${userMail}`, 200)
    }catch(error){
        next(error)
    }
}

const emailVerifid = async (req, res, next) => {
	try{
		const verificationForm = req.body
		const { token } = verificationForm
		console.log(verificationForm, "verificationForm")
		const findToken = await (await Token.findOne({ token }))
		if(!findToken){
			throw Error('token not found.');
		}

		const isTokenverified = await User.findOne({
				_id:findToken.userId
		})

		if(isTokenverified.isVerified){
			throw Error('Email is already verified.');
		}

		const userToken = await User.updateOne(
			{
				_id:findToken.userId
			},
			{
				$set: {isVerified: true}
			}
			)
		
		const nullToken = await Token.remove({_id: findToken._id})
		if(!userToken){
			throw Error('user not found.');
		}

		responseHelper.success(res, `Your email is verified.`, 200)
	}catch(error){
		next(error)
	}
}

const authenticate = async (req, res, next) => {
	try {
		const userForm = await userValidator.login.validateAsync(req.body);
		const { email, password } = userForm;
		const user = await User.findOne({ email });
		if (!user) {
			throw Error('Email is inncorrect');
		}
		const passwordMatch = await bcrypt.compare(password, user.password);
		if (!passwordMatch) {
			throw Error('Password is inncorrect.');
		}
		if(!user.isVerified){
			throw Error('email is not verified.');
		}
		console.log(user)
		const userToken = jwtHelper.createNewToken(user);
		console.log(userToken,"resss")
		responseHelper.token(res, userToken, 200);
	} catch (error) {
		next(error);
	}
};

const resendToken = async (req, res, next) => {
	try{
		 const userToken = await userValidator.resendVerificationToken.validateAsync(req.body);
		 const { email } = userToken
		 const user = await User.findOne({ email });
		 if(!user){
			 throw Error("User is not register with us.")
		 }else if(user.isVerified){
			throw Error("User is already verify.")
		 }else{
			const resendToken = new Token({ userId: user._id, token: crypto.randomBytes(16).toString('hex') })
			await verifiedToken.save(resendToken)

		// await ()
		let subject = 'Account Verification Token'
		let userMail = user.email
		let text = 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + verifiedToken.token + '.\n'
		console.log(userMail)
		await SendMail.sendmail(req, res, userMail, subject, text)
        responseHelper.success(res, `user created successfully a verification link send to ${userMail}`, 200)
		 }

	}catch(error){
		next(error)
	}
}

module.exports = {
	register,
	authenticate,
	emailVerifid,
	resendToken
};