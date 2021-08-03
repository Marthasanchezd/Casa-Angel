const { create, createImages, update, updateImage } = require('./../models/mascotas');
const { imgFile } = require('../utils/fileHandler');

const createMascota = async(body, file) => {
    try {
        const { insertId: id_mascota } = await create(body);
        const uid = imgFile(file);
        const obj = { id_mascota, uid };
        const { insertId: idImg } = await createImages(obj);
        return idImg;
    } catch (error) {
        console.error(error);
    }
}
const updateMascota = async(id, body, file) => {
    try {
        const id_mascota = await update(id, body);
        if (file) {
            const uid = imgFile(file);
            const obj = { uid };
            const idImg = await updateImage(id, obj);
            return idImg;
        } else {
            return id_mascota;
        }
    } catch (error) {
        console.error(error);
    }
}


module.exports = { createMascota, updateMascota }