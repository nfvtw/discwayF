const Router = require('express')
const router = new Router()
const dayjs = require('dayjs')
const authController = require('../controllers/auth.controller')
const authMiddleware = require('../middleware/auth.middleware')
const roleMiddleware = require('../middleware/role.middleware')
const { check } = require('express-validator')

const today = dayjs();
const eighteenYears = today.subtract(18, 'year')

router.post('/registration', [
    check('name', 'Имя пользователя не может быть пустым').notEmpty(),
    check('password', 'Пароль должен содержать не менее 8 символов').isLength({ min: 8 }),
    check('phone', 'Номер телефона введён неверно').isMobilePhone(),
    check('birthday')
        .isDate().withMessage('Дата рождения введена не верно')
        .isBefore(eighteenYears.toISOString()).withMessage('Вам менее 18 лет')
], authController.registration)
router.post('/login', [
     check('phone', 'Номер телефона введён неверно').optional().isMobilePhone(),
     check('email', 'Адрес электронной почты введён неверно').optional().isEmail(),
     check('password', 'Пароль не введён').notEmpty()
], authController.login)
router.get('/getAllUsers', roleMiddleware(true), authController.getUsers)

module.exports = router;