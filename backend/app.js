const express = require("express");

const port = 3000;
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");

const taskRoutes = require("./Routes/tache");
const userRoutes = require("./Routes/user");

const app = express();
const server = http.createServer(app);








app.get("/" ,(req,res)=> {
    res.send("server running");
})


app.use("/ap2", userRoutes);






// Gestion des connexions Socket.io
io.on("connection", (socket) => {
    console.log("Un utilisateur connecté :", socket.id);
    socket.on("disconnect", () => console.log("Utilisateur déconnecté"));
});
// Middleware pour parser JSON et Socket.io
app.use(express.json());
app.use((req, res, next) => {
    req.io = io;
    next();
});
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});




app.listen(port,()=>{
    console.log("server running on port" , port);
})
async function connectdb(params) {
    await mongoose.connect("mongodb://localhost:27017/tache?retryWrites=true&w=majority")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

    
}


connectdb().catch((err)=>{
    console.error(err);
})