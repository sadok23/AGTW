

const express = require("express");
const User = require("../db/users");

const router = express.Router();


// Middleware d'authentification
const authenticate = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).send("Accès refusé");

    try {
        const verified = jwt.verify(token, SECRET_KEY);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send("Token invalide");
    }
};

// Inscription
router.post("/register", async (req, res) => {
    const { name, address, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, address, password: hashedPassword, role });
    await user.save();
    res.send("Utilisateur enregistré");
});

// Connexion
router.post("/login", async (req, res) => {
    const { name, password } = req.body;
    const user = await User.findOne({ name });
    if (!user) return res.status(400).send("Utilisateur non trouvé");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send("Mot de passe incorrect");

    const token = jwt.sign({ _id: user._id, role: user.role }, SECRET_KEY, { expiresIn: "1h" });
    res.header("Authorization", token).send({ token });
});

// Routes CRUD pour User
router.post("/users", authenticate, async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.send(user);
});

module.exports = router;