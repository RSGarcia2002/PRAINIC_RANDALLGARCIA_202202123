const cursoCtrl = {};
const Curso = require('../models/curso'); 

cursoCtrl.getCursos = async (req, res) => {
    try {
        const cursos = await Curso.find();
        res.json(cursos);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los cursos", error });
    }
};

cursoCtrl.getCurso = async (req, res) => {
    try {
        const curso = await Curso.findById(req.params.id);
        if (!curso) {
            return res.status(404).json({ message: "Curso no encontrado" });
        }
        res.json(curso);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el curso", error });
    }
};

cursoCtrl.createCurso = async (req, res) => {
    try {
        const curso = new Curso(req.body);
        await curso.save();
        res.json({ status: "Curso guardado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al crear el curso", error });
    }
};

cursoCtrl.editCurso = async (req, res) => {
    try {
        const updatedCurso = await Curso.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        if (!updatedCurso) {
            return res.status(404).json({ message: "Curso no encontrado" });
        }
        res.json({ status: "Curso actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el curso", error });
    }
};

cursoCtrl.deleteCurso = async (req, res) => {
    try {
        const deletedCurso = await Curso.findByIdAndDelete(req.params.id);
        if (!deletedCurso) {
            return res.status(404).json({ message: "Curso no encontrado" });
        }
        res.json({ status: "Curso eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el curso", error });
    }
};

module.exports = cursoCtrl;
