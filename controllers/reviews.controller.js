const db = require('../db')
const Review = require('../models/review.cjs');

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
            console.log(sum, (sum / count).toFixed(1))
            return res.status(200).json({ message: `Рейтинг подсчитан`})
        } catch (err) {
            console.log(err)
            return res.status(400).json({ message: `Общий рейтинг не был посчитан`})
        }
    }
}

module.exports = new ReviewsController()