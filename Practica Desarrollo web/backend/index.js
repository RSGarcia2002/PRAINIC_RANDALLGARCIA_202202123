const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./database'); // Conexión a MongoDB
const publicacionRoutes = require('./routes/publicacion.routes');

const app = express();

// Conectar a MongoDB
connectDB();

// Configuraciones
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200' }));

// Rutas
app.use('/api/catedratico', require('./routes/catedratico.routes'));
app.use('/api/comentarios', require('./routes/comentario.routes'));
app.use('/api/cursos', require('./routes/cursos.routes'));
app.use('/api/alumnos', require('./routes/alumnos.routes'));
app.use('/api/cursosAprobados', require('./routes/cursosAbrobados.routes'));
app.use('/api/publicacion', publicacionRoutes);
app.use('/api/auth', require('./routes/auth.routes') );

// Iniciar servidor
app.listen(app.get('port'), () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${app.get('port')}`);
});
