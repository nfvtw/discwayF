const Router = require('express')
const router = new Router()
const reviewsController = require('../controllers/reviews.controller')
const { check } = require('express-validator')
const authMiddleware = require('../middleware/auth.middleware')
const productMiddleware = require('../middleware/product.middleware')

router.post('/calculateAVG', [
    check('rating', 'Оценка не может быть больше 5 или меньше 1').isFloat({ min: 1, max: 5})
], reviewsController.calculateAverage)
router.post('/createReview', authMiddleware, productMiddleware , /*rentMiddleware*/ reviewsController.createReview)
router.get('/getCountReview', reviewsController.getCountReview)
router.get('/getReviews', reviewsController.getReviews)
router.get('/getReviewRating', reviewsController.getReviewRating)

module.exports = router