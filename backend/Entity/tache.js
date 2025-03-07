const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    status: { type: String, enum: ["en cours", "fait", "debut"], default: "debut" }
});




module.exports = mongoose.model("tache", taskSchema);