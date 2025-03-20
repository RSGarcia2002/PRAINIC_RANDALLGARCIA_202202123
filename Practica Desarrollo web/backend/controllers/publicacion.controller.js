const Publicacion = require('../models/publicacion');

// ✅ Crear una nueva publicación
exports.crearPublicacion = async (req, res) => {
    try {
        const { curso, catedratico, mensaje } = req.body;
        const nuevaPublicacion = new Publicacion({
            usuario: req.user.id,
            curso: curso || null,
            catedratico: catedratico || null,
            mensaje
        });

        await nuevaPublicacion.save();
        res.status(201).json({ message: 'Publicación creada con éxito', publicacion: nuevaPublicacion });
    } catch (error) {
        console.error("❌ Error al crear publicación:", error);
        res.status(500).json({ message: 'Error al crear la publicación', error });
    }
};

// ✅ Obtener todas las publicaciones con comentarios
exports.obtenerPublicaciones = async (req, res) => {
    try {
        const publicaciones = await Publicacion.find()
            .populate('usuario', 'nombres email') // ✅ Traer usuario de la publicación
            .populate('curso', 'nombre')
            .populate('catedratico', 'nombre')
            .populate({
                path: 'comentarios', // ✅ Populamos los comentarios
                populate: { path: 'usuario', select: 'nombres email' } // ✅ Populamos el usuario de cada comentario
            });

        console.log("🟢 Publicaciones con comentarios:", publicaciones); // 🔍 Debugging

        res.json(publicaciones);
    } catch (error) {
        console.error("❌ Error al obtener publicaciones:", error);
        res.status(500).json({ message: 'Error al obtener las publicaciones', error });
    }
};

// ✅ Obtener una publicación específica con comentarios
exports.obtenerPublicacionPorId = async (req, res) => {
    try {
        const publicacion = await Publicacion.findById(req.params.id)
            .populate('usuario', 'nombres email')
            .populate('curso', 'nombre')
            .populate('catedratico', 'nombre')
            .populate({
                path: 'comentarios',
                populate: { path: 'usuario', select: 'nombres email' }
            });

        if (!publicacion) return res.status(404).json({ message: 'Publicación no encontrada' });

        res.json(publicacion);
    } catch (error) {
        console.error("❌ Error al obtener la publicación:", error);
        res.status(500).json({ message: 'Error al obtener la publicación', error });
    }
};

// ✅ Eliminar una publicación
exports.eliminarPublicacion = async (req, res) => {
    try {
        const publicacion = await Publicacion.findById(req.params.id);
        if (!publicacion) return res.status(404).json({ message: 'Publicación no encontrada' });

        if (publicacion.usuario.toString() !== req.user.id) {
            return res.status(403).json({ message: 'No tienes permisos para eliminar esta publicación' });
        }

        await publicacion.deleteOne();
        res.json({ message: 'Publicación eliminada con éxito' });
    } catch (error) {
        console.error("❌ Error al eliminar la publicación:", error);
        res.status(500).json({ message: 'Error al eliminar la publicación', error });
    }
};
