const express = require('express');
const router = express.Router();
const multer = require('multer');
const config = { dest: './public/tmp' };
const upload = multer(config);
const service = require('./../../services/usuarios');
const model = require('./../../models/usuarios');


const getAll = async(req, res) => {
    const usuarios = await model.getAll();
    console.log(usuarios);
    res.render('adminUsuarios', { usuarios })
}
const del = async(req, res) => {
    const { id } = req.params;
    const msgUsuarios = await model.deleteU(id);
    const msgImagen = await model.deleteImg(id);
    res.redirect('/adminUsuarios');
}

router.get('/', getAll);
router.get('/delete/:id', del);

module.exports = router;