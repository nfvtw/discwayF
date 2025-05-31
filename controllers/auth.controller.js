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
            const {name, surname, patronymic, birthday, phone, email, password, admin = 'false'} = req.body
            const formattedBirthday = dayjs(birthday, 'DD.MM.YYYY', true);
            if (!formattedBirthday.isValid()) {
                return res.status(400).json({ message: 'Неверный формат даты рождения' });
            }
            console.log(name, surname, patronymic, birthday, phone, email, password, admin)
            const candidateByEmail = await Users.findOne({ 
                where: { email }
            });
            const candidateByPhone = await Users.findOne({ 
                where: { phone }
            });
            if (candidateByEmail || candidateByPhone) {
                if (candidateByEmail && candidateByPhone)
                    return res.status(400).json({ message: 'Пользователь с такой почтой и номером уже существует'})
                else if (candidateByEmail)
                    return res.status(400).json({ message: 'Пользователь с такой почтой уже существует'})
                else if (candidateByPhone)
                    return res.status(400).json({ message: 'Пользователь с таким номер уже существует'})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            userController.createUser(name, surname, patronymic, birthday, phone, email, hashPassword, admin)
            return res.status(200).json({ message: `Пользователь успешно зарегестрирован`})
        } catch (err) {
            console.log(err)
            res.status(400).json({ message: 'Registration error' })
        }
    }

    async login(req, res) {
        try {
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
                 return res.status(400).json({ message: 'Не указан номер телефона или email' });
            }
            if (!user) {
                return res.status(400).json({ message: `Пользователь  не найден`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({ message: `Введён неверный пароль`})
            }
            const token = generateAccessToken(user.id, user.admin)
            return res.json({ token })
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