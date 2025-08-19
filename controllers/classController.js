const classService = require('../services/classServices');

const getAllClasses = async (req, res) => {
    try {
        const classes = await classService.getAllClass();
        if (!classes.length) {
            return res.status(404).json({
                success: false,
                message: 'No classes found'
            });
        }
        res.status(200).send({
            success: true,
            message: 'GET ALL CLASSES API SUCCESS',
            totalClasses: classes.length,
            data: classes,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'GET ALL CLASSES API ERROR',
            error,
        });
    }
}

const createClass = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Class name is required'
            });
        }
        const newClass = await classService.createClass(name);
        res.status(201).send({
            success: true,
            message: 'CREATE CLASS API SUCCESS',
            data: newClass,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'CREATE CLASS API ERROR',
            error,
        });
    }
}

const updateClass = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Class name is required'
            });
        }
        const updatedClass = await classService.updateClass(id, name);
        if (!updatedClass) {
            return res.status(404).json({
                success: false,
                message: 'Class not found'
            });
        }
        res.status(200).send({
            success: true,
            message: 'UPDATE CLASS API SUCCESS',
            data: updatedClass,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'UPDATE CLASS API ERROR',
            error,
        });
    }
}

const deleteClass = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedClass = await classService.deleteClass(id);
        if (!deletedClass) {
            return res.status(404).json({
                success: false,
                message: 'Class not found'
            });
        }
        res.status(200).send({
            success: true,
            message: 'DELETE CLASS API SUCCESS',
            data: deletedClass,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'DELETE CLASS API ERROR',
            error,
        });
    }
}

module.exports = {
    getAllClasses,
    createClass,
    updateClass,
    deleteClass
};