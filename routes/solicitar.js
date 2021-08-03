const express = require('express');
const router = express.Router();
const { getAll, getSingle, getNombre } = require('./../models/mascotas');
const { verifyUser } = require('./../middlewares/auth')


const get = async(req, res) => {
    const mascotas = await getAll();
    console.log(mascotas);
    res.render('adoptar', { mascotas })
}
const single = async(req, res) => {
    const { id } = req.params;
    const [mascota] = await getSingle(id);
    res.render('mascota', { mascota })
}


router.get('/', get);
router.get('/single/:id', single);

module.exports = router;