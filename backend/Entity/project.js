const mongoose = require("mongoose");



const projectSchema = new mongoose.Schema({
    name: String,
    date: Date,
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
    status: { type: String, enum: ["en cours", "fin"], default: "en cours" }
});

module.exports = mongoose.model("project", taskSchema);