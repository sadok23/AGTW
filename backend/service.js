const express = require('express');
const cors = require('cors');
const connectDB = require('./db/config');
const userRoutes = require('./Routes/user');
const app = express();
const proRoutes = require('./Routes/project');
const socketIo = require("socket.io");
const http = require("http");
const server = http.createServer(app);
// Initialisation de l'application


// Connexion à la base de données
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    req.io = io;
    next();
});

const io = socketIo(server, {
    cors: {
        origin: "*",
      methods: ["GET", "POST"]
    }
  });




io.on('connection', (socket) => {
  console.log('Un client est connecté');

  socket.on('disconnect', () => {
    console.log('Un client est déconnecté');
  });
});

// Routes
app.use('/api', userRoutes);
app.use('/pro', proRoutes);


console.log("mansour");





// Gestion des erreurs globales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Une erreur est survenue !', error: err.message });
});

// Port d'écoute
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(S`erveur en cours d exécution sur le port ${PORT}`);}); 