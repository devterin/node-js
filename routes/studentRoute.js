const express = require('express');
const { getStudents, getStudentById, createStudent, updateStudent, deleteStudent } = require('../controllers/studentController');

const router = express.Router();

//route get all students - GET
router.get('/', getStudents);
//route get student by id - GET
router.get('/:id', getStudentById);
//route create new student - POST
router.post('/', createStudent);
//route update student - PUT
router.put('/:id', updateStudent);
//route delete student by id - DELETE
router.delete('/:id', deleteStudent);

module.exports = router;