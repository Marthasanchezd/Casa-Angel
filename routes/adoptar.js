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
const buscador = async(req, res) => {
    let { aBuscar } = req.body;
    aBuscar = '%' + aBuscar + '%';
    const mascotas = await getNombre(aBuscar);
    console.log(mascotas);
    res.render('adoptar', { mascotas })
}
const solicitar = async(req, res) => {
    const { id } = req.params;
    const [mascota] = await getSingle(id);
    res.render('solicitar', { mascota })
}

router.get('/', get);
router.get('/single/:id', single);
router.get('/solicitar/:id', solicitar);
router.post('/', buscador);
module.exports = router;