const db = require('../db')
const Users = require('../models/user.cjs')
const userController = require('../controllers/user.controller')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dayjs = require('dayjs');
const { validationResult } = require('express-validator')
const dotenv = require('dotenv')


dotenv.config()

const generateAccessToken = (id, admin) => {
    const payload = {
        id, 
        admin
    }
    return jwt.sign(payload, process.env.SECRET, { expiresIn: "24h" })
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: 'Ошибка при регистрации: ', errors})
            }
            const {name, surname, patronymic, birthday, phone, email = null, password, admin = 'false'} = req.body
            const formattedBirthday = dayjs(birthday, 'DD.MM.YYYY', true);
            if (!formattedBirthday.isValid()) {
                return res.status(400).json({ message: 'Неверный формат даты рождения' });
            }
            console.log(name, surname, patronymic, birthday, phone, password, admin)
            if (!phone) {
                return res.status(400).json({ message: 'Данные введены некорректно: введите телефон'})
            }
            const candidateByPhone = await Users.findOne({
                where: { phone }
            });
            if (candidateByPhone) {
                return res.status(400).json({ message: 'Пользователь с таким номером уже существует'})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const user = await Users.create({ name, surname, patronymic, birthday, phone, email, password: hashPassword, admin })
            user.password = undefined
            return res.status(200).json({ 
                message: "Пользователь успешно зарегестрирован",
                user: user
            })
        } catch (err) {
            console.log(err)
            res.status(400).json({ message: 'Registration error' })
        }
    }

    async login(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: 'Ошибка при регистрации: ', errors})
            }
            const {phone, email, password} = req.body
            let user = null;
            if (phone) {
                user = await Users.findOne({ 
                where: { phone }
            });
            }
            else if (email) {
                user = await Users.findOne({ 
                where: { email }
            });
            }
            else {
                 return res.status(400).json({ message: 'Не указан номер телефона или адрес электронной почты' });
            }
            if (!user) {
                return res.status(400).json({ message: `Пользователь  не найден`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({ message: `Введён неверный пароль`})
            }
            const token = generateAccessToken(user.id, user.admin)
            return res.json({
                message: "Вы успешно зашли",
                token: token
            })
        } catch (err) {
            console.log(err)
            res.status(400).json({ message: 'Login error' })
        }
    }
    
    async getUsers(req, res) {
        try {
            const users = await Users.findAll()
            res.json(users)
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = new authController();