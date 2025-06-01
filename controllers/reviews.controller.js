const dayjs = require('dayjs');
const db = require('../db')
const Review = require('../models/review.cjs');
const Products = require('../models/product.cjs')

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
                { rating: avg },
                { where: {id: id_product } }
            )
            
            res.json(newReview)
            return res.status(200).json({ message: `Отзыв создан`})
        } catch (err) {
            console.log(err)
            res.status(400).json({ message: `Отзыв не был создан`})
        }
    }
}

module.exports = new ReviewsController()