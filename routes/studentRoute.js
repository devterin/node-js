const express = require('express');
const { getStudents, getStudentById, createStudent, updateStudent, deleteStudent, validateCreateStudent } = require('../controllers/studentController');
const ensureAuthenticated = require('../middlewares/authMiddlewares');

const router = express.Router();

//route get all students - GET
router.get('/', ensureAuthenticated, getStudents);
//route get student by id - GET
router.get('/:id', ensureAuthenticated, getStudentById);
//route create new student - POST
router.post('/', ensureAuthenticated, validateCreateStudent, createStudent);
//route update student - PUT
router.put('/:id', ensureAuthenticated, validateCreateStudent, updateStudent);
//route delete student by id - DELETE
router.delete('/:id', ensureAuthenticated, deleteStudent);

module.exports = router;