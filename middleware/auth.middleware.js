const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next()
    }
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            console.log(`auth.middleware`)
            return res.status(403).json({ message: 'Нет заголовка авторизации' });
        }
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            console.log(`auth.middleware`)
            return res.status(403).json({ message: 'Пользователь не авторизован, нет токена' })
        }
        const decodedData = jwt.verify(token, process.env.SECRET)
        req.user = decodedData
        next()
    } catch (err) {
        console.log(`auth.middleware`)
        console.log(err)
        return res.status(403).json({ message: 'Пользователь не авторизован!' })
    }
}