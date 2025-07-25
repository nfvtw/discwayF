const Products = require('../models/product.cjs')
const Rents = require('../models/rent.cjs')
const db = require('../db')
const dayjs = require('dayjs')
const { Op } = require('sequelize')


class RentController {
    async createRent (req, res) {
        try {
            const id_renter = req.user.id
            const { id_product, date_in, date_out } = req.body

            const owner = await Products.findOne({
                where: { id: id_product },
                attributes: [ 'id_user' ]
            })

            console.log(owner)

            if (owner.id_user === id_renter) {
              return res.status(400).json({ message: `Нельзя арендовать свой товар` })
            }

            const product = await Products.findOne({ // Поиск продукта
                where: { id: id_product },
            })

            product.status = 'active' // Изменение статуса продукта
            await product.save() // Сохранение таблицы продуктов

            const newRent = await db.query('INSERT INTO rents (id_renter, id_product, status, date_in, date_out) values ($1, $2, $3, $4, $5) RETURNING *', [ id_renter, id_product, product.status, date_in, date_out ])

            res.status(200).json({
                message: `Товар успешно арендован`,
                rent: newRent
            })
        } catch (err) {
            console.log(err)
            return res.status(400).json({ message: `Ошибка при создании аренды` })
        }
    }

    async checkDate(req, res) {
    try {
      const today = dayjs();
      
      const rents = await Rents.findAll({
        where: { 
          status: 'active',
          date_out: { [Op.lt]: today }
        }
      })

      if (rents.length > 0) {
          await Rents.update(
            { status: 'inactive' },
            { where: { id: rents.map(rent => rent.id) } } // Создаём массив только из id
          )

          await Products.update(
            { status: 'inactive' },
            { where: { id: rents.map(rent => rent.id_product) } } // Создаём массив только из id_product
          )
      }

      res.status(200).json({ message: 'Проверка прошла успешно, таблицы обновлены' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при обновлении статуса прошедших аренд' });
    }
}
}

module.exports = new RentController()