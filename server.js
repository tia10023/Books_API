const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const booksRouter = require('./routes/books');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/api/books', booksRouter);

app.get('/', (req, res) => {
  res.json({ 
    message: 'Books API with Express + MySQL + Sequelize',
    version: '1.0.0'
  });
});

// Test DB connection
sequelize.authenticate()
  .then(() => {
    console.log('✅ MySQL connected');
    sequelize.sync({ alter: true })  // Crea o aggiorna tabella se manca
      .then(() => {
        console.log('✅ DB synced');
        app.listen(PORT, () => {
          console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
      });
  })
  .catch(err => {
    console.error('❌ DB connection error:', err);
  });
