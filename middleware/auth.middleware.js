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
            return res.status(403).json({ message: 'Нет заголовка авторизации' });
        }
        console.log('AUTH HEADER:', req.headers.authorization);
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(403).json({ message: 'Пользователь не авторизован, токен не валиден' })
        }
        console.log(token, 123)
        const decodedData = jwt.verify(token, process.env.SECRET)
        req.user = decodedData
        next()
    } catch (err) {
        console.log(err)
        return res.status(403).json({ message: 'Пользователь не авторизован!' })
    }
}