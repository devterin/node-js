
const studentService = require('../services/studentService.js');
const db = require('../config/db.js');

//Mock database
jest.mock('../config/db.js');

describe('studentService.getStudents', () => {

    it('should return all students', async () => {
        // fake data
        const mockData = [[
            { id: 1, name: 'John', gender: 1, birthday: '2000-01-01', email: 'john@example.com', class_id: 1, class_name: 'A1' }
        ]];

        // call db , return mockData
        db.query.mockResolvedValueOnce(mockData);

        // call method getStudents test
        const result = await studentService.getStudents();

        // check ket qua
        expect(result).toHaveLength(1);
        expect(result[0].name).toBe('John');
        expect(result[0].email).toBe('john@example.com');
    });

    it('should return empty array if no students', async () => {
        db.query.mockResolvedValueOnce([[]]); // trả về mảng rỗng
        const result = await studentService.getStudents();
        expect(result).toHaveLength(0);
    });
});