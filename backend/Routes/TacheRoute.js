
const express = require("express");
const Task = require("../db/tache");

const router = express.Router();

// Ajouter une tâche
router.post("/taches", async (req, res) => {
    try {
       
        const newTask = new Task(req.body);
        await newTask.save();

        req.io.emit("tacheCreated", newTask); 

        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
});


// Récupérer toutes les tâches (GET)
router.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find(); 
        res.status(200).json(tasks); 
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
});


router.put("/taches/:id", async (req, res) => {
    try {
        const { newStatus } = req.body;
        const task = await Task.findByIdAndUpdate(req.params.id, { statut: newStatus }, { new: true });

        if (!task) return res.status(404).json({ message: "Tâche non trouvée" });

        req.io.emit("tacheStatusUpdated", { taskId: task._id, newStatus }); // Envoie une notif

        res.json({ message: "Statut mis à jour", task });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
});

module.exports = router;