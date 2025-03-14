const mongoose = require('mongoose');

const connectDB = async () => {
   
        await mongoose.connect("mongodb://localhost:27017/tache?retryWrites=true&w=majority")
        .then(() => console.log("MongoDB connected"))
        .catch(err => console.error("MongoDB connection error:", err));
    
        
    
};

module.exports = connectDB; 