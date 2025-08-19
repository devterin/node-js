const dontenv = require('dotenv');
dontenv.config();

const express = require('express');
const passport = require('passport');
const session = require('express-session');
const morgan = require('morgan');
const mySqlPool = require('./config/db.js');
const colors = require('colors');
const { initGoogleAuth } = require('./services/authServices.js');

const app = express();

// cấu hình session (để passport lưu thông tin user)
app.use(session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false
}));
// khởi tạo passport
app.use(passport.initialize());
app.use(passport.session());
// gọi service để setup Google Strategy
initGoogleAuth();

app.use(express.static('views/students'));

//middleware
app.use(morgan('dev'));
app.use(express.json());

//routes
const studentRoute = require('./routes/studentRoute.js');
app.use('/api/v1/student', studentRoute);

const authRoute = require('./routes/authRoute.js');
app.use('/', authRoute);

const classRoute = require('./routes/classRoute.js');
app.use('/api/v1/class', classRoute);

//port
const port = process.env.PORT || 3000;

//listen
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
//database connection
mySqlPool.query('SELECT 1').then(() => {
    console.log('Database connected successfully'.bgCyan.white);
}).catch((err) => {
    console.error('Database connection failed:'.bgRed.white, err);
});

