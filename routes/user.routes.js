const Router = require('express')
const router = new Router()
const userController = require('../controllers/user.controller')
const authMiddleware = require('../middleware/auth.middleware')

router.post('/user', userController.createUser)
router.get('/users', userController.getUsers)
router.get('/user/:id', userController.getOneUser)
router.put('/user', userController.updateUser)
router.delete('/user/:id', userController.deleteUser)
router.get('/getUnratedProducts', authMiddleware, userController.getUnratedProducts)

module.exports = router