const Router = require('express')
const router = new Router()
const roleMiddleware = require('../middleware/role.middleware')
const categoriesController = require('../controllers/categories.controller')

router.post('/category', roleMiddleware(true), categoriesController.createCategory)

module.exports = router