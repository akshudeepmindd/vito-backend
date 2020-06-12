const jwtHelper = require('../helpers/jwt');
const User = require('../db/models/userSchema');

const authCheck = async (req, res, next) => {
	try {
		console.log(req.headers.authorization, "hello auth check")

		const decodedToken = await jwtHelper.decryptToken(req.headers.authorization);

		console.log(decodedToken, "gggggggg")

		if (decodedToken.message) {
			throw decodedToken;
		}

		const user = await User.findById({ _id: decodedToken.id });
		req.user = user;
		next();
	} catch (error) {
		next(error);
	}
};

module.exports = {
	authCheck
};
