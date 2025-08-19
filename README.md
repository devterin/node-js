# node-js
# Student Management Tutorial

## Introduction

This is a student management project built with Node.js, Express, Passport (Google OAuth), Sequelize, and MySQL.  
Users must log in with Google to access CRUD functions for students and classes.

## Main Features

- Login with Google OAuth2 (Passport.js)
- Student management: add, edit, delete, view list
- Class management: view class list
- Data validation when creating/updating students
- Protect APIs with login middleware
- User interface built with Bootstrap

## Testing

- Test files for services and controllers are provided (using Jest).
- Test cases include: displaying student list, adding new student, checking for duplicate email, data validation
- To run tests:
    ```
    npm test
    ```

## Folder Structure

- `index.js`: Server initialization, session and passport configuration, routing
- `controllers/`: API logic handlers
- `services/`: Database interaction
- `models/`: Sequelize model definitions
- `routes/`: API route definitions
- `middlewares/`: Login authentication middleware
- `views/`: UI for student CRUD

## Usage Guide

1. Install dependencies:
    ```
    npm install
    ```
2. Create a `.env` file and configure Google OAuth and database information.
3. Start the server:
    ```
    npm start
    ```
4. Access `http://localhost:${port}` to log in with Google and use the system.

## Notes

- Only logged-in users can access APIs and student/class management pages.
- Session is stored in cookies, default duration is 1 day.
- When creating/updating students, the system checks for duplicate emails and validates input data.

## Author

- Le Quang Viet