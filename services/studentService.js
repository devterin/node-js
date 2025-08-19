const Student = require('../models/Student');
const Clazz = require('../models/Clazz');

const getStudents = async () => {
    const students = await Student.findAll({
        include: { model: Clazz, as: 'class' },
        raw: true,
        nest: true
    });
    return students;
};

const getStudentById = async (id) => {
    return await Student.findByPk(id, {
        include: { model: Clazz, as: 'class' },
        raw: true,
        nest: true
    });
};

const createStudent = async ({ name, email, gender, birthday, class_id }) => {
    const existing = await Student.findOne({ where: { email } });
    if (existing) {
        throw new Error('Email already exists');
    }
    return await Student.create({ name, email, gender, birthday, class_id });
};

const updateStudent = async (id, { name, email, gender, birthday, class_id }) => {
    const student = await Student.findByPk(id);
    if (!student) {
        return null;
    }
    const existing = await Student.findOne({ where: { email, id: { [Student.sequelize.Op.ne]: id } } });
    if (existing) {
        throw new Error('Email already exists');
    }
    await student.update({
        name, email, gender, birthday, class_id
    });
    return student.get({ plain: true });
};

const deleteStudent = async (id) => {
    const student = await Student.findByPk(id);
    if (!student) {
        return null;
    }
    await student.destroy();
    return student;
};

module.exports = {
    getStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
};
