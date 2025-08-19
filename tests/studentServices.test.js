
const Student = require('../models/Student');

const studentService = require('../services/studentService.js');

jest.mock('../models/Student');

describe('studentService.getStudents', () => {

    it('should return all students', async () => {
        // fake data
        const mockData = [
            { id: 1, name: 'John', gender: 1, birthday: '2000-01-01', email: 'john@example.com', class: { id: 1, name: 'A1' } }
        ];

        // call db , return mockData
        Student.findAll.mockResolvedValueOnce(mockData);

        // call method getStudents test
        const result = await studentService.getStudents();

        // check ket qua
        expect(result).toHaveLength(1);
        expect(result[0].name).toBe('John');
        expect(result[0].email).toBe('john@example.com');
        expect(result[0].class.name).toBe('A1');
    });

    it('should return empty array if no students', async () => {
        Student.findAll.mockResolvedValueOnce([]);
        const result = await studentService.getStudents();
        expect(result).toHaveLength(0);
    });
});

describe('studentService.createStudent', () => {
    it('should create a student successfully', async () => {
        const input = { name: 'John Doe', email: 'john@example.com', gender: 1, birthday: '2000-01-01', class_id: 1 };
        const mockStudent = { id: 1, ...input };

        Student.findOne.mockResolvedValueOnce(null); // Không trùng email
        Student.create.mockResolvedValueOnce(mockStudent);

        const result = await studentService.createStudent(input);

        expect(Student.findOne).toHaveBeenCalledWith({ where: { email: input.email } });
        expect(Student.create).toHaveBeenCalledWith(input);
        expect(result).toEqual(mockStudent);
    });

    it('should throw error if email already exists', async () => {
        const input = { name: 'John Doe', email: 'john@example.com', gender: 1, birthday: '2000-01-01', class_id: 1 };
        Student.findOne.mockResolvedValueOnce({ id: 2, ...input }); // Email đã tồn tại

        await expect(studentService.createStudent(input)).rejects.toThrow('Email already exists');
    });

    it('should throw error if creation fails', async () => {
        const input = { name: 'John Doe', email: 'john@example.com', gender: 1, birthday: '2000-01-01', class_id: 1 };

        Student.findOne.mockResolvedValueOnce(null);
        Student.create.mockRejectedValueOnce(new Error('DB error'));

        await expect(studentService.createStudent(input)).rejects.toThrow('DB error');
    });
});