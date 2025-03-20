const catedraticoCtrl = {};
const Catedratico = require('../models/catedratico'); 

catedraticoCtrl.getCatedraticos = async (req, res) => {
    try {
        const catedraticos = await Catedratico.find();
        res.json(catedraticos);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener catedráticos", error });
    }
};

catedraticoCtrl.getCatedratico = async (req, res) => {
    try {
        const catedratico = await Catedratico.findById(req.params.id);
        if (!catedratico) {
            return res.status(404).json({ message: "Catedrático no encontrado" });
        }
        res.json(catedratico);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener catedrático", error });
    }
};

catedraticoCtrl.createCatedratico = async (req, res) => {
    try {
        const catedratico = new Catedratico(req.body);
        await catedratico.save();
        res.json({ status: "Catedrático guardado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al crear catedrático", error });
    }
};

catedraticoCtrl.deleteCatedratico = async (req, res) => {
    try {
        const deletedCatedratico = await Catedratico.findByIdAndDelete(req.params.id);
        if (!deletedCatedratico) {
            return res.status(404).json({ message: "Catedrático no encontrado" });
        }
        res.json({ status: "Catedrático eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar catedrático", error });
    }
};

module.exports = catedraticoCtrl;
