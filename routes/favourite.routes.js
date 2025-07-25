const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/auth.middleware')
const favoutriteController = require('../controllers/favourite.controller')
const productMiddleware = require('../middleware/product.middleware')

router.post('/favourite', authMiddleware, productMiddleware, favoutriteController.addFavourite)

module.exports = router