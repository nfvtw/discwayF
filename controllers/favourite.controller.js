const db = require('../db')
const Products = require('../models/product.cjs');
const Favourites = require('../models/favourite.cjs')

class FavouriteController {
    async addFavourite(req, res) {
        try {
            const id_user = req.user.id
            const { id_product } = req.body
            console.log(id_user, id_product)
            
            const doubleAdd = await Favourites.findOne({
                where: {id_user, id_product}
            })
            
            if (doubleAdd) {
                return res.status(400).json({ message: `Товар уже находится в избранном` })
            }
            const newFavourite = await db.query('INSERT INTO favourites (id_user, id_product) values ($1, $2) RETURNING *', [ id_user, id_product ])

            console.log(newFavourite)
            return res.status(200).json({ message: `Избранное успешно добавлено` })
        } catch (err) {
            console.log(err)
            return res.status(400).json({ message: `Не удалось добавить товар в избранное` })
        }
    }
}

module.exports = new FavouriteController()