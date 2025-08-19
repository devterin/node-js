const studentService = require('../services/studentService.js');

const getStudents = async (req, res) => {
    try {
        const students = await studentService.getStudents();
        if (!students.length) {
            return res.status(404).json({
                success: false,
                message: 'No students found'
            });
        }
        res.status(200).send({
            success: true,
            message: 'GET ALL STUDENTS API SUCCESS',
            totalStudents: students.length,
            // students: data[0].map(students => students.name),
            data: students,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'GET ALL STUDENTS API ERROR',
            error,
        });
    }
}

const getStudentById = async (req, res) => {
    try {
        const studentId = req.params.id;
        const student = await studentService.getStudentById(studentId);
        if (!student.length) {
            return res.status(404).json({
                success: false,
                message: 'Not student found'
            });
        }
        res.status(200).send({
            success: true,
            message: 'GET STUDENT BY ID API SUCCESS',
            studentDetails: student[0],
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'GET STUDENT BY ID API ERROR',
            error,
        });

    }
}

const createStudent = async (req, res) => {
    try {
        const { name, email, gender, birthday, class_id } = req.body;

        if (!name || !email || !gender || !birthday || !class_id) {
            return res.status(400).send({
                success: false,
                message: 'All fields are required',
            });
        }
        const student = await studentService.createStudent(name, email, gender, birthday, class_id);
        if (!student) {
            return res.status(404).send({
                success: false,
                message: 'Create student failed',
            });
        }
        res.status(201).send({
            success: true,
            message: 'CREATE STUDENT API SUCCESS',
            response: student
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'CREATE STUDENT API ERROR',
            error,
        });

    }
}

const updateStudent = async (req, res) => {
    try {
        const { name, email, gender, birthday, class_id } = req.body;
        const studentId = req.params.id;

        if (!name || !email || !gender || !birthday || !class_id) {
            return res.status(400).send({
                success: false,
                message: 'All fields are required',
            });
        }

        const student = await studentService.updateStudent(studentId, name, email, gender, birthday, class_id);

        if (!student) {
            return res.status(404).send({
                success: false,
                message: 'Update student failed',
            });
        }

        res.status(200).send({
            success: true,
            message: 'UPDATE STUDENT API SUCCESS',
            response: student
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'UPDATE STUDENT API ERROR',
            error,
        });
    }
};


const deleteStudent = async (req, res) => {
    try {
        const studentId = req.params.id;
        const student = await studentService.deleteStudent(studentId);
        if (!student) {
            return res.status(404).send({
                success: false,
                message: 'Delete student failed',
            });
        }
        res.status(200).send({
            success: true,
            message: 'DELETE STUDENT API SUCCESS',
            response: {
                id: student.id,
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'DELETE STUDENT API ERROR',
            error,
        });

    }
}


module.exports = {
    getStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
}