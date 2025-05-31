const Router = require('express')
const router = new Router()
const authController = require('../controllers/auth.controller')
const authMiddleware = require('../middleware/auth.middleware')
const roleMiddleware = require('../middleware/role.middleware')
const { check } = require('express-validator')

router.post('/registration', [
    check('name', 'Имя пользователя не может быть пустым').notEmpty(),
    check('password', 'Пароль должен содержать не менее 8 символов').isLength({ min: 8 }),
    check('phone', 'Номер телефона введён неверно').isMobilePhone()
],authController.registration)
router.post('/login', authController.login)
router.get('/getAllUsers', roleMiddleware(true), authController.getUsers)

module.exports = router;