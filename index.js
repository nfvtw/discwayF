const express = require('express')
const userRouter = require('./routes/user.routes')
const productRouter = require('./routes/product.routes')
const categoriesRouter = require('./routes/categories.routes')
const authRouter = require('./routes/auth.routes')
const favouriteRouter = require('./routes/favourite.routes')
const dotenv = require('dotenv')
const pool = require('./db.js')
const sequelize = require('./models/sequelize.cjs');
const Users = require('./models/user.cjs');
const Products = require('./models/product.cjs');
const Rents = require('./models/rent.cjs');
const Reviews = require('./models/review.cjs')
const Favourites = require('./models/favourite.cjs')
const Categories = require('./models/categories.cjs')

dotenv.config()

const app = express()

app.use(express.json())

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to the database', err.stack);
  } else {
    console.log('Connected to the database:', res.rows);
  }
});

// Связи
Users.hasMany(Products, { foreignKey: 'id_user' });
Products.belongsTo(Users, { foreignKey: 'id_user' });

Users.hasMany(Rents, { foreignKey: 'renter' });
Rents.belongsTo(Users, { foreignKey: 'renter' });

Products.hasMany(Rents, { foreignKey: 'idProduct' });
Rents.belongsTo(Products, { foreignKey: 'idProduct' });

Products.hasMany(Reviews, { foreignKey: 'idProduct' });
Reviews.belongsTo(Products, { foreignKey: 'idProduct' });

Products.hasMany(Favourites, { foreignKey: 'id_product' });
Favourites.belongsTo(Products, { foreignKey: 'id_product' });

Users.hasMany(Favourites, { foreignKey: 'id_user' });
Favourites.belongsTo(Users, { foreignKey: 'id_user' });

Categories.hasMany(Products, { foreignKey: 'category_name' });
Products.belongsTo(Categories, { foreignKey: 'category_name' });
// Связи

(async () => {
  try {
    await sequelize.sync({});
    console.log('Sequelize synced successfully. Tables updated.');
  } catch (err) {
    console.error('Failed to sync Sequelize:', err);
  }
})();

app.use('/', userRouter, productRouter, categoriesRouter, authRouter, favouriteRouter)

app.listen(process.env.PORT, () => console.log(`SERVER STARTED ON PORT ${process.env.PORT}`))
