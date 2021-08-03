const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const session = require('express-session');
const { verifyUser, verifyAdmin } = require('./middlewares/auth');

dotenv.config();
//ALL
const indexRouter = require('./routes/index');
const registro = require('./routes/registro');
const login = require('./routes/login');
const contacto = require('./routes/contacto');


//USER
const usuarios = require('./routes/usuarios');
const usuarioIndex = require('./routes/usuario/index');
const contactoU = require('./routes/usuario/contacto');
const about = require('./routes/about');
const blog = require('./routes/blog');
const experiencias = require('./routes/experiencias');
const darAdopcion = require('./routes/darAdopcion');
const adoptar = require('./routes/adoptar');
const mascota = require('./routes/mascota');

//ADMIN
const adminIndex = require('./routes/admin/index');
const adminUsuarios = require('./routes/admin/usuarios');
const adminMascotas = require('./routes/admin/mascotas');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'Empanada',
    cookie: { maxAge: null },
    resave: true,
    saveUninitialized: false
}))

//ALL
app.use('/', indexRouter);
app.use('/registro', registro);
app.use('/login', login);
app.use('/contacto', contacto);


//USERS
app.use('/usuarioIndex', verifyUser, usuarioIndex);
app.use('/usuarios', verifyUser, usuarios);
app.use('/contactou', verifyUser, contactoU);
app.use('/about', verifyUser, about);
app.use('/blog', verifyUser, blog);
app.use('/experiencias', verifyUser, experiencias);
app.use('/darAdopcion', verifyUser, darAdopcion);
app.use('/adoptar', verifyUser, adoptar);
app.use('/mascota', verifyUser, mascota);


//ADMIN
app.use('/admin', verifyAdmin, adminIndex);
app.use('/admin/usuarios', verifyAdmin, adminUsuarios);
app.use('/admin/mascotas', verifyAdmin, adminMascotas);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;