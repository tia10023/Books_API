const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('books_db', 'root', '', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    logging: console.log,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

// Test connection
sequelize.authenticate()
  .then(() => console.log('DB connected'))
  .catch(err => console.error('DB connection failed:', err));

module.exports = sequelize;