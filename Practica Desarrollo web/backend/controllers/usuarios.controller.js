const Usuario = require('../models/usuarios');
const CursoAprobado = require('../models/cursosAprobados');
const Curso = require('../models/curso'); // Importa el modelo de cursos

const usuarioCtrl = {};

// ✅ Obtener todos los usuarios (Para administración o debugging)
usuarioCtrl.getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find().select('-contraseña'); // No enviar contraseñas
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener usuarios", error });
    }
};

// ✅ Obtener perfil de un usuario por ID
usuarioCtrl.getUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findById(id).select('-contraseña'); // No enviar contraseña
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Obtener cursos aprobados y calcular créditos totales
        const cursosAprobados = await CursoAprobado.find({ usuario: id }).populate('curso', 'nombre creditos');
        const totalCreditos = cursosAprobados.reduce((sum, c) => sum + c.curso.creditos, 0);

        res.json({ usuario, cursosAprobados, totalCreditos });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener usuario", error });
    }
};

// ✅ Actualizar usuario (Datos personales)
usuarioCtrl.editUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombres, apellidos, correo } = req.body;

        const updatedUser = await Usuario.findByIdAndUpdate(id, { nombres, apellidos, correo }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json({ message: "Usuario actualizado correctamente", usuario: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar usuario", error });
    }
};

// ✅ Eliminar usuario
usuarioCtrl.deleteUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await Usuario.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar usuario", error });
    }
};

// ✅ Agregar curso aprobado
usuarioCtrl.agregarCursoAprobado = async (req, res) => {
    try {
        const { cursoId } = req.body;
        const usuarioId = req.user.id;

        // Verificar si el curso existe
        const curso = await Curso.findById(cursoId);
        if (!curso) {
            return res.status(404).json({ message: "Curso no encontrado" });
        }else{
            console.log(cursoId)
        }

        // Verificar si el usuario ya aprobó este curso
        const existe = await CursoAprobado.findOne({ usuario: usuarioId, curso: cursoId });
        if (existe) {
            return res.status(400).json({ message: "Este curso ya está aprobado" });
        }

        // Guardar el curso aprobado
        const cursoAprobado = new CursoAprobado({ usuario: usuarioId, curso: cursoId });
        await cursoAprobado.save();

        res.status(201).json({ message: "Curso aprobado agregado con éxito", cursoAprobado });
    } catch (error) {
        res.status(500).json({ message: "Error al agregar curso aprobado", error });
    }
};

// ✅ Eliminar curso aprobado
usuarioCtrl.eliminarCursoAprobado = async (req, res) => {
    try {
        const { id } = req.params; // ID del curso aprobado
        await CursoAprobado.findByIdAndDelete(id);
        res.json({ message: "Curso aprobado eliminado con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar curso aprobado", error });
    }
};

module.exports = usuarioCtrl;
