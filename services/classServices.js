const db = require('../config/db.js');

const getAllClass = async () => {
    const data = await db.query('SELECT * FROM clazz');
    return data[0];
};

const createClass = async (name) => {
    const data = await db.query('INSERT INTO clazz (name) VALUES (?)', [name]);
    return {
        id: data[0].insertId,
        name,
    };
};

const updateClass = async (id, name) => {
    const data = await db.query('UPDATE clazz SET name=? WHERE id=?', [name, id]);
    return data[0].affectedRows > 0 ? { id, name } : null;
};

const deleteClass = async (id) => {
    const data = await db.query('DELETE FROM clazz WHERE id=?', [id]);
    if (data[0].affectedRows === 0) {
        return null;
    }
    return { id };
};

module.exports = {
    getAllClass,
    createClass,
    updateClass,
    deleteClass
};

