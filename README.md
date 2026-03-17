Books API 📚
RESTful API completa per la gestione di un catalogo librario con MySQL, Express e Sequelize ORM.

[
[
[
[
[

✨ Demo Live
Prova l'API completa → localhost:3000

(Aggiungi screenshot/GIF dopo test)

🚀 Caratteristiche
CRUD completo per libri (GET/POST/PUT/DELETE)

Database relazionale MySQL con Sequelize ORM

Paginazione e filtri avanzati (?author=Orwell&year=1949&page=2)

Validazione input automatica (campi obbligatori, tipi)

Frontend HTML/JS incluso (no framework, vanilla)

Status HTTP corretti (201, 400, 404, 500)

Connection pool MySQL per performance

Cors abilitato per frontend esterni

🛠 Tecnologie Stack
text
Frontend: HTML5, CSS3, Vanilla JavaScript (ES6+)
Backend: Node.js 22, Express 4.x
Database: MySQL 8.x + Sequelize 6.x ORM
Dev: Nodemon, XAMPP
Deploy: Render/Vercel ready
📁 Struttura Progetto
text
books-api/
├── config/           # Config DB Sequelize
│   └── database.js
├── models/           # Modelli Sequelize
│   └── Book.js
├── routes/           # Router Express
│   └── books.js
├── public/           # Frontend statico
│   ├── index.html
│   ├── style.css
│   └── script.js
├── server.js         # Entry point
├── package.json
└── README.md
🗄 Database Schema
sql
CREATE TABLE books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  year INT NOT NULL,
  is_published BOOLEAN DEFAULT FALSE,
  genre VARCHAR(100) DEFAULT 'Unknown'
);
📖 Documentazione API
Metodo	Endpoint	Descrizione	Body Esempio
GET	/api/books	Lista libri (paginazione + filtri)	-
GET	/api/books/:id	Dettaglio libro	-
POST	/api/books	Crea libro	{"title":"1984","author":"Orwell","year":1949}
PUT	/api/books/:id	Aggiorna libro	{"title":"Nuovo titolo","isPublished":true}
DELETE	/api/books/:id	Elimina libro	-
Query Parameters
text
GET /api/books?author=Orwell&year=1949&page=1&limit=10
Response Standard
json
{
  "data": [...],
  "total": 25,
  "page": 1,
  "limit": 10
}
🚀 Installazione & Avvio
Prerequisiti
Node.js 18+

XAMPP (MySQL)

1. Clona e installa
bash
git clone <tuo-repo-url>
cd books-api
npm install
2. Setup Database
sql
-- phpMyAdmin (localhost/phpmyadmin)
CREATE DATABASE books_db;
-- Esegui schema SQL sopra
3. Avvia
bash
npm run dev  # Con nodemon (sviluppo)
# oppure
npm start    # Produzione
4. Apri browser
text
http://localhost:3000  # Frontend
http://localhost:3000/api/books  # API pura
🧪 Test API (Postman/cURL)
bash
# Lista
curl http://localhost:3000/api/books

# Crea
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","author":"Test","year":2023}'
📊 Esempio Response
json
{
  "data": [
    {
      "id": 1,
      "title": "1984",
      "author": "George Orwell",
      "year": 1949,
      "isPublished": true,
      "genre": "Dystopian"
    }
  ],
  "total": 2,
  "page": 1,
  "limit": 10
}
💡 Skills Demonstrate
Backend: REST API design, Express routing, middleware

Database: MySQL, Sequelize ORM, connection pooling

Frontend: Vanilla JS, async/await, fetch API

Best Practices: Status code, validazione, error handling

DevOps: Nodemon, CORS, static files serving

🔮 Prossimi Passi (Roadmap)
 Autenticazione JWT per protezione API

 Swagger/OpenAPI docs automatiche

 Unit test con Jest/Supertest

 Rate limiting e caching Redis

 Docker containerizzazione

 CI/CD GitHub Actions

 Deploy production (Render/DigitalOcean)

🚀 Deploy Facile
Push su GitHub

Render.com: New → Web Service → GitHub repo

Aggiungi env: DATABASE_URL=...

Live in 5 min!
