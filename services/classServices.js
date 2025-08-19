const Clazz = require('../models/Clazz');

const getAllClass = async () => {
    return await Clazz.findAll({
        raw: true,
        nest: true
    });
};

const createClass = async (name) => {
    const clazz = await Clazz.create({ name });
    return clazz;
};

const updateClass = async (id, name) => {
    const clazz = await Clazz.findByPk(id);
    if (!clazz) return null;
    await clazz.update({ name });
    return clazz;
};

const deleteClass = async (id) => {
    const clazz = await Clazz.findByPk(id);
    if (!clazz) return null;
    await clazz.destroy();
    return clazz;
};

module.exports = {
    getAllClass,
    createClass,
    updateClass,
    deleteClass
};
