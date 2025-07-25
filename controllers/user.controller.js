const db = require('../db')
const Rents = require('../models/rent.cjs')
const Reviews = require('../models/review.cjs')

class UserController {
    async createUser(name, surname, patronymic, birthday, phone = null, email, password, admin) {
        console.log(name, surname, patronymic, birthday, phone, email, password, admin)
        const newPerson = await db.query('INSERT INTO users (name, surname, patronymic, birthday, phone, email, password, admin) values ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [name, surname, patronymic, birthday, phone, email, password, admin]);

        return (newPerson);
    }

    async getUsers(req, res) {
        const users = await db.query('SELECT * FROM users')
        res.json(users.rows)
    }

    async getOneUser(req, res) {
        const id = req.params.id
        const users = await db.query('SELECT * FROM users where id = $1', [id])
        res.json(users.rows[0])
    }

    async updateUser(req, res) {
        const {id, name, surname, phone_number, email, password} = req.body
        const user = await db.query('UPDATE users set name = $1, surname = $2 where id = $3 RETURNING *', [name, surname, id])
        res.json(user.rows[0])
    }

    async deleteUser(req, res) {
        const id = req.params.id
        const user = await db.query('DELETE FROM users where id = $1', [id])
        res.json(user.rows[0])
    }

    async getUnratedProducts(req, res) {
            try {
                const id = req.user.id

                const unratedProducts = await db.query('SELECT rents.id_product FROM rents LEFT JOIN reviews ON rents.id_product = reviews.id_product AND reviews.id_renter = $1 WHERE reviews.id_product IS NULL AND rents.id_renter = $1', [id])

                if (unratedProducts.rows.length === 0) {
                    return res.status(200).json({ message: "Неоценённые товары отсутствуют" }) 
                }

                return res.status(200).json(unratedProducts.rows)
        } catch (err) {
            console.log(err)
            return res.status(400).json({ message: "Ошибка при получении неоценённых товаров" })
        }
    }
}

module.exports = new UserController()