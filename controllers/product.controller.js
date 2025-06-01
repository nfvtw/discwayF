const db = require('../db')
const Products = require('../models/product.cjs');
const Users = require('../models/user.cjs');

class ProductController {
    async createProduct(req, res) {
        const id_user = req.user.id
        const {category_name, product_name, overview, price, photo, status = 'inactive', rating = 0} = req.body
        console.log(id_user, category_name, product_name, overview, price, status, photo, rating)
        const newProduct = await db.query('INSERT INTO products (id_user, category_name, product_name, overview, price, photo, status, rating) values ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [id_user, category_name, product_name, overview, price, photo, status, rating])

        res.json(newProduct)
    }

    async getProduct(req, res) {
        const products = await db.query('SELECT * FROM products')
        res.json(products.rows)
    }

    async getOneProduct(req, res) {
        const id = req.params.id
        const products = await db.query('SELECT * FROM products where id = $1', [id])
        res.json(products.rows[0])
    }

    async updateProduct(req, res) {
        const {id, category_name, product_name, overview, price, photo} = req.body
        const products = await db.query('UPDATE products set category_name = $1, product_name = $2 where id = $3 RETURNING *', [category_name, product_name, id])
        res.json(products.rows[0])
    }

    async deleteProduct(req, res) {
        const id = req.params.id
        const products = await db.query('DELETE FROM products where id = $1', [id])
        res.json(products.rows[0])
    }

    async getNameOwner(req, res) {
    const id = req.params.id
    try {
        const product = await Products.findByPk(id, {
        include: {
            model: Users,
            attributes: ['name']
        }
        });

       if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (!product.user) {
            return res.status(404).json({ message: 'User not found for this product' });
        }

        res.json({ name: product.user.name });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
    }
}

module.exports = new ProductController()