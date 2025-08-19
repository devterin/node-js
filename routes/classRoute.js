const express = require('express');
const { getAllClasses, createClass, updateClass, deleteClass } = require('../controllers/classController');

const router = express.Router();

router.get('/', getAllClasses);
router.post('/', createClass);
router.put('/:id', updateClass);
router.delete('/:id', deleteClass);

module.exports = router;