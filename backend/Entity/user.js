const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
   
    name: String,
    role: { type: String, enum: ["admin", "developpeur"] },
    address: String,
    motDePasse: String, 
    image: String,
    tachesEffectuees: [{ type: mongoose.Schema.Types.ObjectId, ref: "tache" }],
});

// Avant de sauvegarder un utilisateur, crypter le mot de passe
userSchema.pre("save", async function (next) {
    if (!this.isModified("motDePasse")) return next();
    this.motDePasse = await bcrypt.hash(this.motDePasse, 10); 
    next();
});

const User = mongoose.model("Users", userSchema);
module.exports = User;
