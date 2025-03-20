const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost/CursosAprobados'); // ✅ Sin opciones innecesarias
        console.log('✅ MongoDB conectado correctamente...');
    } catch (error) {
        console.error('❌ Error conectando a MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
