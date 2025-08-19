const db = require('../config/db.js');

const getStudents = async () => {
    const data = await db.query('SELECT s.id, s.name, s.gender, s.birthday, s.email,c.id AS class_id, c.name AS class_name FROM students s        INNER JOIN clazz c ON s.class_id = c.id ');
    return data[0];
};

const getStudentById = async (id) => {
    const data = await db.query('SELECT * FROM students WHERE id = ?', [id]);
    return data[0];
};

const createStudent = async (name, email, gender, birthday, class_id) => {
    const data = await db.query(
        'INSERT INTO students (name, email, gender, birthday, class_id) VALUES (?, ?, ?, ?, ?)',
        [name, email, gender, birthday, class_id]
    );
    return { id: data[0].insertId, name, email, gender, birthday, class_id };
};

const updateStudent = async (id, name, email, gender, birthday, class_id) => {
    const data = await db.query(
        'UPDATE students SET name=?, email=?, gender=?, birthday=?, class_id=? WHERE id=?',
        [name, email, gender, birthday, class_id, id]
    );
    return data[0].affectedRows > 0
        ? { id, name, email, gender, birthday, class_id }
        : null;
};

const deleteStudent = async (id) => {
    const data = await db.query('DELETE FROM students WHERE id=?', [id]);
    if (data[0].affectedRows === 0) {
        return null;
    }
    return { id };
};

module.exports = {
    getStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
};
