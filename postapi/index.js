const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./database/db');
const postRoutes = require('./postroutes');
const PORT = 3000;
// Importación del modelo Post
const { Post } = require('./database/Post');

const app = express();

// Middleware para manejar CORS
app.use(cors());

// Middleware para manejar JSON en las solicitudes
app.use(bodyParser.json());

// Rutas para la API de posts
app.use('/api', postRoutes);



// Sincronización de Sequelize con la base de datos
sequelize.sync({ force: false }).then(() => {
  console.log('Database & tables created!');

  // Iniciar el servidor
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
