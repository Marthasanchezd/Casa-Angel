const pool = require('./../utils/bd');

const getAll = async() => {
    try {
        const query = "SELECT * FROM ??";

        const params = [process.env.T_USUARIOS, process.env.T_USUARIOSIMG];
        return await pool.query(query, params);
    } catch (error) {
        console.error(error);
    }
}
const single = async(id) => {
    const query = "SELECT * FROM ?? WHERE id = ?";
    const params = [process.env.T_USUARIOS, id];
    return await pool.query(query, params);
}
const deleteU = async(id) => {
    try {
        const query = "UPDATE ?? SET eliminado = 1 WHERE id = ?";
        const params = [process.env.T_USUARIOS, id];
        return await pool.query(query, params);
    } catch (error) {
        console.error(error);
    }
}

const deleteImg = async(id) => {
    try {
        const query = "UPDATE ?? SET eliminado = 1 WHERE id_usuario = ?";
        const params = [process.env.T_USUARIOSIMG, id];
        return await pool.query(query, params);
    } catch (error) {
        console.error(error);
    }
}
const all = async() => {
    const query = "SELECT * FROM ??";
    const params = [process.env.T_USUARIOS];
    return await pool.query(query, params);
}

const create = async(obj) => {
    const query = "INSERT INTO ?? SET ?";
    const params = [process.env.T_USUARIOS, obj];
    return await pool.query(query, params);
}
const verify = async(uid) => {
    const query = "UPDATE ?? SET habilitado = 1 WHERE confirmacionCorreo = ?"
    const params = [process.env.T_USUARIOS, uid];
    return await pool.query(query, params);
}
const auth = async(username, pass) => {
    const query = "SELECT id, admin FROM ?? WHERE username = ? AND pass = ? AND habilitado = 1 AND eliminado = 0";
    const params = [process.env.T_USUARIOS, username, pass];
    return await pool.query(query, params);
}

const update = async(id, obj) => {
    const query = "UPDATE ?? SET ? WHERE id = ?";
    const params = [process.env.T_USUARIOS, obj, id];
    return await pool.query(query, params);
}




module.exports = { getAll, deleteU, deleteImg, single, all, create, verify, auth, update }