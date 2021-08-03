const express = require('express');
const router = express.Router();
const multer = require('multer');
const config = { dest: './public/tmp' };
const upload = multer(config);
const service = require('./../../services/mascotas');
const model = require('./../../models/mascotas');


const getAll = async(req, res) => {
    const mascotas = await model.getAll();
    console.log(mascotas);
    res.render('adminMascotas', { mascotas })
}
const del = async(req, res) => {
    const { id } = req.params;
    const msgMascotas = await model.deleteMas(id);
    const msgImagen = await model.deleteImg(id);
    res.redirect('/adminMascotas');
}

router.get('/', getAll);
router.get('/delete/:id', del);

module.exports = router;