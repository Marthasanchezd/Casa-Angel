const { update, updateImage } = require('./../models/usuarios');
const { imgFile } = require('../utils/fileHandler');


const updateUsuario = async(id, body, file) => {
    try {
        const idUsuario = await update(id, body);
        if (file) {
            const uid = imgFile(file);
            const obj = { uid };
            const idImg = await updateImage(id, obj);
            return idImg;
        } else {
            return idUsuario;
        }
    } catch (error) {
        console.error(error);
    }
}


module.exports = { updateUsuario }