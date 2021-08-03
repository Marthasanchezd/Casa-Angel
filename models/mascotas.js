const pool = require('../utils/bd');

const create = (obj) =>
    pool.query("INSERT INTO ?? SET ?", [process.env.T_MASCOTAS, obj]).then(response => response).catch(err => console.error(err));

const createImages = (obj) =>
    pool.query("INSERT INTO ?? SET ?", [process.env.T_MASCOTASIMG, obj]).then(response => response).catch(err => console.error(err));


const getAll = async() => {
    try {
        const query = "SELECT m.id, m.nombre, m.descripcion, mI.uid AS uuid FROM ?? AS m JOIN ?? AS mI ON m.id = mI.id_mascota WHERE m.eliminado = 0";

        const params = [process.env.T_MASCOTAS, process.env.T_MASCOTASIMG];
        return await pool.query(query, params);
    } catch (error) {
        console.error(error);
    }
}
const getSingle = async(id) => {
    try {
        const query = "SELECT m.id, m.nombre, m.descripcion, mI.uid AS uuid FROM ?? AS m JOIN ?? AS mI ON m.id = mI.id_mascota WHERE m.eliminado = 0 AND m.id = ?";
        const params = [process.env.T_MASCOTAS, process.env.T_MASCOTASIMG, id];
        return await pool.query(query, params);
    } catch (error) {
        console.error(error);
    }
}
const deleteMas = async(id) => {
    try {
        const query = "UPDATE ?? SET eliminado = 1 WHERE id = ?";
        const params = [process.env.T_MASCOTAS, id];
        return await pool.query(query, params);
    } catch (error) {
        console.error(error);
    }
}

const deleteImg = async(id) => {
    try {
        const query = "UPDATE ?? SET eliminado = 1 WHERE id_empleado = ?";
        const params = [process.env.T_MASCOTASIMG, id];
        return await pool.query(query, params);
    } catch (error) {
        console.error(error);
    }
}

const update = async(id, obj) => {
    try {
        const query = "UPDATE ?? SET ? WHERE id = ?";
        const params = [process.env.T_MASCOTAS, obj, id];
        return await pool.query(query, params);
    } catch (error) {
        console.error(error);
    }
}

const updateImage = async(id, obj) => {
    try {
        const query = "UPDATE ?? SET ? WHERE id_mascota = ?";
        const params = [process.env.T_MASCOTASIMG, obj, id];
        return await pool.query(query, params);
    } catch (error) {
        console.error(error);
    }
}
const getNombre = async(nombre) => {
    const query = "SELECT m.id, m.nombre, m.descripcion FROM ?? AS m JOIN ??  WHERE m.nombre LIKE ? AND m.eliminado = 0";
    const params = [process.env.T_MASCOTAS, process.env.T_CATEGORIAS, nombre];
    const rows = await pool.query(query, params);
    return rows;
}

module.exports = { create, createImages, getAll, deleteMas, deleteImg, getSingle, update, updateImage, getNombre }