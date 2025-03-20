const cursosAprobadosCtrl = {};
const CursosAprobados = require('../models/cursosAprobados'); 

cursosAprobadosCtrl.getCursosAprobados = async (req, res) => {
    try {
        const cursosAprobados = await CursosAprobados.find()
            .populate('usuario', 'nombres apellidos correo')
            .populate('curso', 'nombre codigo');
        res.json(cursosAprobados);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los cursos aprobados", error });
    }
};

cursosAprobadosCtrl.getCursosAprobadosPorUsuario = async (req, res) => {
    try {
        const cursos = await CursosAprobados.find({ usuario: req.params.usuarioId })
            .populate('curso', 'nombre codigo');
        if (!cursos.length) {
            return res.status(404).json({ message: "No se encontraron cursos aprobados para este usuario" });
        }
        res.json(cursos);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los cursos aprobados del usuario", error });
    }
};

cursosAprobadosCtrl.createCursoAprobado = async (req, res) => {
    try {
        const { usuario, curso } = req.body;

        // Verificar si ya existe la relación usuario-curso
        const existe = await CursosAprobados.findOne({ usuario, curso });
        if (existe) {
            return res.status(400).json({ message: "Este curso ya fue aprobado por el usuario" });
        }

        const cursoAprobado = new CursosAprobados(req.body);
        await cursoAprobado.save();
        res.json({ status: "Curso aprobado guardado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al crear curso aprobado", error });
    }
};

cursosAprobadosCtrl.deleteCursoAprobado = async (req, res) => {
    try {
        const { usuario, curso } = req.body;

        const deleted = await CursosAprobados.findOneAndDelete({ usuario, curso });
        if (!deleted) {
            return res.status(404).json({ message: "No se encontró el curso aprobado para eliminar" });
        }
        res.json({ status: "Curso aprobado eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar curso aprobado", error });
    }
};

module.exports = cursosAprobadosCtrl;
