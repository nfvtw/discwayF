const Router = require('express')
const router = new Router()
const reviewsController = require('../controllers/reviews.controller')
const { check } = require('express-validator')

router.post('/calculateAVG', [
    check('rating', 'Оценка не может быть больше 5 или меньше 1').isFloat({ min: 1, max: 5})
], reviewsController.calculateAverage)

module.exports = router