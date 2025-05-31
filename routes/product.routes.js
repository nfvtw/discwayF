const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/auth.middleware')
const productController = require('../controllers/product.controller')

router.post('/product/', authMiddleware, productController.createProduct)
router.get('/products', productController.getProduct)
router.get('/product/:id', productController.getOneProduct)
router.put('/product', productController.updateProduct)
router.delete('/product/:id', productController.deleteProduct)
router.get('/productOwner/:id', productController.getNameOwner)

module.exports = router