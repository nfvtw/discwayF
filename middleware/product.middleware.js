const Products = require('../models/product.cjs')

module.exports = async function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next()
    }
    try {
        const { id_product } = req.body
        const findProduct = await Products.findOne({
            where: {id: id_product}
        })

        if (!findProduct) {
            console.log(`product.middleware`)
            return res.status(400).json({ message: `Товар не найден` })
        }
        
        next()
    } catch (err) {
        console.log(`product.middleware`)
        console.log(err)
        return res.status(403).json({ message: 'Ошибка при нахождении товара' })
    }
}