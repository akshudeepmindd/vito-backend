const JWT = require('jsonwebtoken')
const responseHelper = require('./response')
const jwthelper = require('./jwt')
const { JWT_SECRET, JWT_EXPIRE_TIME } = process.env

const authToken = async (req, res, next) => {
  if (!req.header('Authorization')) {
    throw Error('Please make sure your request has an Authorization header.')
  }
  const token = req.header('Authorization').replace('Bearer ', '')
  const data = jwthelper.decryptToken(token, process.env.TOKEN_SECRET)
  try {
    const user = await User.findOne({ _id: data.sub.id, token: token })
  } catch (error) {
    next(error)
  }
}
