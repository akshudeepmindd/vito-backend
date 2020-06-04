const User = require('../db/models/userSchema');
const userValidator = require('../validators/uservalidator');
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
        const { firstName, lastName, userName, email } = userForm;
        const user = await User.findOne({ email });
        if(user){
            throw Error('Email is not unique');
        }
		const users = await new User(userForm).save();
		const verifiedToken = new Token({ userId: users._id, token: crypto.randomBytes(16).toString('hex') });
		console.log(verifiedToken, "verifiedToken")
		// await new Token()
		await verifiedToken.save(verifiedToken.token)

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
		const findToken = await Token.findOne({ token: req.body.token })
		if(!findToken){
			throw Error('token not found.');
		}

		const userToken = await User.updateOne(
			{
				_id:findToken.userId
			},
			{
				$set: {isVerified: true}
			}
			)
		if(!userToken){
			throw Error('user not found.');
		}
		responseHelper.success(res, `Your email is verified`, 200)
		// const tokenVerified = await Token.updateOne({token:token},{
		// 	$set: {token: null}
		// })
	}catch(erroe){
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

module.exports = {
	register,
	authenticate,
	emailVerifid
};