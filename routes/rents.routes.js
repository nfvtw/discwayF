const Router = require('express')
const router = new Router()
const rentController = require('../controllers/rents.controller')
const authMiddleware = require('../middleware/auth.middleware')
const roleMiddleware = require('../middleware/role.middleware')
const productMiddleware = require('../middleware/product.middleware')

router.post('/newRent', authMiddleware, productMiddleware, rentController.createRent)
router.patch('/updateDate', roleMiddleware, rentController.checkDate)

module.exports = router