const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/auth.middleware')
const favoutriteController = require('../controllers/favourite.controller')

router.post('/favourite', authMiddleware, favoutriteController.addFavourite)

module.exports = router