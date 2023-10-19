const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'votre_utilisateur_mysql',
  password: 'votre_mot_de_passe_mysql',
  database: 'user_management',
});

db.connect(err => {
  if (err) throw err;
  console.log('Connecté à la base de données MySQL');
});

app.post('/inscription', (req, res) => {
  const { username, email, password } = req.body;
  const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(sql, [username, email, password], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Utilisateur inscrit avec succès !' });
  });
});

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
