const db = require('../db')
const Products = require('../models/product.cjs');
const Users = require('../models/user.cjs');

class FavouriteController {
    async addFavourite(req, res) {
        try {
            const id_user = req.user.id
            const { id_product } = req.body
            console.log(id_user, id_product)
            const newFavourite = await db.query('INSERT INTO favourites (id_user, id_product) values ($1, $2) RETURNING * ', [id_user, id_product])

            console.log(newFavourite)
            return res.status(200).json({ message: `Избранное успешно добавлено`})
        } catch (err) {
            console.log(err)
            return res.status(400).json({ message: `Не удалось добавить товар в избранное`})
        }
    }
}

module.exports = new FavouriteController()