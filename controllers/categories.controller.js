const db = require('../db')

class CategoryController {
    async createCategory(req, res) {
       try {
             const {name} = req.body
            console.log(name)
            const newCategory = await db.query('INSERT INTO categories (name) values ($1) RETURNING *', [name])

        return res.status(200).json({ message: `Категория ${name} создана`})
       } catch (err) {
            console.log(err)
            return res.status(400).json({ message: `Ошибка создания категории`})
       }

    }
}

module.exports = new CategoryController()