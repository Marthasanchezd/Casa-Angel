const express = require('express');
const router = express.Router();
const multer = require('multer');
const config = { dest: './public/tmp' };
const upload = multer(config);
const service = require('../services/mascotas');
const model = require('../models/mascotas');

const create = async(req, res) => {
    console.log(req.body, req.file);
    const idImg = await service.createMascota(req.body, req.file);
    res.redirect('/darAdopcion');
}
const getAll = async(req, res) => {
    const mascotas = await model.getAll();
    console.log(mascotas);
    res.render('darAdopcion', { mascotas })
}
const del = async(req, res) => {
    const { id } = req.params;
    const msgMascotas = await model.deleteMas(id);
    const msgImagen = await model.deleteImg(id);
    res.redirect('/darAdopcion');
}
const getUpdate = async(req, res) => {
    const [mascota] = await model.getSingle(req.params.id);
    console.log(mascota);
    res.render('updateMascota', { mascota })
}
const update = async(req, res) => {
    console.log(req.body, req.file);
    const idImg = await service.updateMascota(req.params.id, req.body, req.file);
    console.log(idImg);
    res.redirect('/darAdopcion');
}

router.get('/create', (req, res) => res.render('createMascotas'))
router.post('/create', upload.single("imagen"), create);
router.get('/', getAll);
router.get('/delete/:id', del);
router.get('/update/:id', getUpdate);
router.post('/update/:id', upload.single("imagen"), update);
module.exports = router;