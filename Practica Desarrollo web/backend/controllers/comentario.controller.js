const Comentario = require('../models/comentario');
const Publicacion = require('../models/publicacion');

const comentarioCtrl = {};

// ✅ Obtener todos los comentarios
comentarioCtrl.getComentarios = async (req, res) => {
    try {
        const comentarios = await Comentario.find()
            .populate('publicacion', 'mensaje')
            .populate('usuario', 'nombres apellidos correo'); // ✅ Asegura que trae los datos del usuario
        res.json(comentarios);
    } catch (error) {
        console.error("❌ Error al obtener los comentarios:", error);
        res.status(500).json({ message: "Error al obtener los comentarios", error });
    }
};


// ✅ Obtener un comentario específico
comentarioCtrl.getComentario = async (req, res) => {
    try {
        const comentario = await Comentario.findById(req.params.id)
            .populate('publicacion', 'mensaje')
            .populate('usuario', 'nombres apellidos correo');
        if (!comentario) {
            return res.status(404).json({ message: "Comentario no encontrado" });
        }
        res.json(comentario);
    } catch (error) {
        console.error("❌ Error al obtener el comentario:", error);
        res.status(500).json({ message: "Error al obtener el comentario", error });
    }
};

// ✅ Crear un nuevo comentario (requiere autenticación)
comentarioCtrl.createComentario = async (req, res) => {
    try {
        const { publicacion, texto } = req.body;
        const usuario = req.user ? req.user.id : null;

        if (!usuario) {
            return res.status(401).json({ message: "Usuario no autenticado" });
        }

        // ✅ Verificar si la publicación existe antes de agregar el comentario
        const publicacionExistente = await Publicacion.findById(publicacion);
        if (!publicacionExistente) {
            return res.status(404).json({ message: "Publicación no encontrada" });
        }

        // ✅ Crear el comentario correctamente vinculado a la publicación
        const nuevoComentario = new Comentario({ publicacion, usuario, texto });
        await nuevoComentario.save();

        // ✅ Agregar el comentario al array de la publicación
        publicacionExistente.comentarios.push(nuevoComentario._id);
        await publicacionExistente.save();

        res.status(201).json({ message: "Comentario guardado correctamente", comentario: nuevoComentario });
    } catch (error) {
        console.error("❌ Error al crear el comentario:", error);
        res.status(500).json({ message: "Error al crear el comentario", error });
    }
};

// ✅ Editar un comentario (solo el autor puede hacerlo)
comentarioCtrl.editComentario = async (req, res) => {
    try {
        const { id } = req.params;
        const comentario = await Comentario.findById(id);
        
        if (!comentario) {
            return res.status(404).json({ message: "Comentario no encontrado" });
        }

        // Verificar si el usuario autenticado es el propietario del comentario
        if (comentario.usuario.toString() !== req.user.id) {
            return res.status(403).json({ message: "No tienes permiso para editar este comentario" });
        }

        const updatedComentario = await Comentario.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        res.json({ message: "Comentario actualizado correctamente", comentario: updatedComentario });
    } catch (error) {
        console.error("❌ Error al actualizar el comentario:", error);
        res.status(500).json({ message: "Error al actualizar el comentario", error });
    }
};

// ✅ Eliminar un comentario (solo el autor puede hacerlo)
comentarioCtrl.deleteComentario = async (req, res) => {
    try {
        const { id } = req.params;
        const comentario = await Comentario.findById(id);

        if (!comentario) {
            return res.status(404).json({ message: "Comentario no encontrado" });
        }

        // Verificar si el usuario autenticado es el propietario del comentario
        if (comentario.usuario.toString() !== req.user.id) {
            return res.status(403).json({ message: "No tienes permiso para eliminar este comentario" });
        }

        await comentario.remove();
        res.json({ message: "Comentario eliminado correctamente" });
    } catch (error) {
        console.error("❌ Error al eliminar el comentario:", error);
        res.status(500).json({ message: "Error al eliminar el comentario", error });
    }
};

module.exports = comentarioCtrl;
