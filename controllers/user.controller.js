const db = require('../db')

class UserController {
    async createUser(name, surname, patronymic, birthday, phone, email, password, admin) {
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
}

module.exports = new UserController()