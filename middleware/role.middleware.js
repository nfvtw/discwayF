const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

module.exports = function () {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
        next()
    }
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(403).json({ message: 'Нет заголовка авторизации' });
        }
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(403).json({ message: 'Пользователь не авторизован' })
        }
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        if (!decoded.admin) {
            return res.status(403).json({ message: `У вас нет доступа` })
        }
        next()
    } catch (err) {
        console.log(err)
        return res.status(403).json({ message: 'Пользователь не авторизован' })
    }
    }
}