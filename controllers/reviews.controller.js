const dayjs = require('dayjs');
const db = require('../db')
const Review = require('../models/review.cjs');
const Products = require('../models/product.cjs')
const Users = require('../models/user.cjs')

async function countReviewsByProductId(id_product) {
        const reviews = await Review.findAll({
            where: { id_product }
        });
        return reviews.length;
    }

class ReviewsController {
    async calculateAverage (req, res) {
        try {
            const { id_product } = req.body
            const reviews = await Review.findAll({
                attributes: ['rating'],
                where: {
                    id_product: id_product
                }
            });
            let sum = 0, count = 0;
            reviews.forEach(review => {
                sum += review.rating;
                count += 1;
            });
            let rating = sum / count;
            console.log(rating.toFixed(1))
            return res.status(200).json({ message: `Рейтинг подсчитан: ${rating.toFixed(1)}`})
        } catch (err) {
            console.log(err)
            return res.status(400).json({ message: `Общий рейтинг не был посчитан`})
        }
    }

    async createReview (req, res) {
        try {
            const id_renter = req.user.id
            const { id_product, rating, comment } = req.body
            const now = new Date();
            const newReview = await db.query('INSERT INTO reviews (id_renter, id_product, rating, comment, date_comment) values ($1, $2, $3, $4, $5) RETURNING *', [id_renter, id_product, rating, comment, now])

            // Изменение рейтинга в поле товара
            const reviews = await Review.findAll({
                where: { id_product }
            })

            let sum = 0;
            reviews.forEach(review => {
                sum += review.rating;
            });

            const avg = sum / reviews.length;

            await Products.update(
                { rating: avg.toFixed(1) },
                { where: {id: id_product } }
            )
            
            res.json(newReview)
            return res.status(200).json({ message: `Отзыв создан`})
        } catch (err) {
            console.log(err)
            res.status(400).json({ message: `Отзыв не был создан`})
        }
    }

    async getCountReview (req, res) {
        try {
            const { id_product } = req.body

            if (!id_product) {
                return res.status(400).json({ message: "ID продукта не предоставлен" });
            }

            const count = await countReviewsByProductId(id_product)
            
            if (count === 0) {
                return res.status(200).json({ message: `У этого товара нет рейтинга` })
            }

            return res.status(200).json({ message: `Рейтинг был подсчитан на основании ${count} оценок` })
        } catch (err) {
            console.log(err)
            return res.status(400).json({ message: `Количество оценок не было подсчитано` })
        }
    }
    async getReview (req, res) {
        try {
            const { id_product } = req.body

            const product = await Products.findOne({
                where: {id: id_product}
            })

            const count = await countReviewsByProductId(id_product)

            if (count === 0) {
                return res.status(200).json({ message: `У этого товара нет рейтинга` })
            }

            console.log(
                'Рейтинг:', product.rating,
                'На основании:', count, 'оценок'
            )

            const reviews = await Review.findAll({
                where: { id_product }
            })
            
            reviews.forEach(async review => {

                const user = await Users.findOne(
                    { where: { id: review.id_renter } }
                )

                console.log(
                    'Рейтинг пользователя: ', review.rating,
                    'Имя пользователя: ', user.name,
                    'Дата: ', review.date_comment,
                    'Комментарий: ', review.comment
                )
            })

            return res.status(200).json({ message: `всё круто`})
        } catch (err) {
            console.log(err)
            return res.status(400).json({ message: `ёпт` })
        }
    }
}

module.exports = new ReviewsController()