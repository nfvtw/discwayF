const db = require('../db')
const Products = require('../models/product.cjs');
const Users = require('../models/user.cjs');
const Categories = require('../models/categories.cjs')

class ProductController {
    async createProduct(req, res) {
        const id_user = req.user.id
        const {category_name, product_name, overview, price, location,  photo, status = 'inactive', rating = 0} = req.body
        console.log(id_user, category_name, product_name, overview, price, location, status, photo, rating)

        const category = await Categories.findOne({
            where: { name: category_name }
        })

        if (!category) {
            return res.status(400).json({ message: `Такой категории не существует` })
        }

        const newProduct = await db.query('INSERT INTO products (id_user, category_name, product_name, overview, price, location, photo, status, rating) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', [id_user, category_name, product_name, overview, price, location, photo, status, rating])

        res.json(newProduct.rows)
    }

    async getProducts(req, res) {
        const products = await db.query('SELECT * FROM products')
        res.json(products.rows)
    }

    async getOneProduct(req, res) {
        const id = req.params.id
        const products = await db.query('SELECT * FROM products where id = $1', [id])
        res.json(products.rows[0])
    }

    async updateProduct(req, res) {
        const {id, category_name, product_name } = req.body
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