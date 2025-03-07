
const express = require("express");
const Project = require("../Entity/project");

const router = express.Router();

// Ajouter une tâche
router.post("/project", async (req, res) => {
    try {
       
        const newProject = new Project(req.body);
        await newProject.save();

        req.io.emit("projectCreated", newProject); 

        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
});


// Récupérer toutes les tâches (GET)
router.get("/projects", async (req, res) => {
    try {
        const projects = await Project.find(); 
        res.status(200).json(projects); 
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
});


router.put("/projects/:id", async (req, res) => {
    try {
        const { newStatus } = req.body;
        const project = await Project.findByIdAndUpdate(req.params.id, { statut: newStatus }, { new: true });

        if (!project) return res.status(404).json({ message: "Projet non trouvée" });

        req.io.emit("projectStatusUpdated", { projectId: project._id, newStatus }); // Envoie une notif

        res.json({ message: "Statut mis à jour", project });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
});

module.exports = router;