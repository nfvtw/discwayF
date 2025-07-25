const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/auth.middleware')
const productMiddleware = require('../middleware/product.middleware')
const productController = require('../controllers/product.controller')

router.post('/product/', authMiddleware, productController.createProduct)
router.get('/products', productMiddleware, productController.getProducts)
router.get('/product/:id', productMiddleware, productController.getOneProduct)
router.put('/product', productMiddleware, productController.updateProduct)
router.delete('/product/:id', productMiddleware, productController.deleteProduct)
router.get('/productOwner/:id', productMiddleware, productController.getNameOwner)

module.exports = router