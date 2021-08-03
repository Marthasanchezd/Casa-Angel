const verifyUser = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.render('login', { message: 'Crea una nueva cuenta o inicia sesión para acceder' })
    }
}
const verifyAdmin = (req, res, next) => {
    if (req.session.admin == 1) {
        next();
    } else {
        res.render('error');
    }
}

module.exports = { verifyUser, verifyAdmin }