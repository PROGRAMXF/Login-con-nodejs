const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const conexion = require('../database/db');
const{promisify} = require('util'); //trabajamos con promesas / vamos a usar una comunicacion asincrona

//metodo para registrarnos
exports.register = async (req, res)=>{
    const name = req.body.name;
    const user = req.body.user;
    const pass = req.body.pass;
    let passHash = await bcryptjs.hash(pass, 8)
   // console.log(passHash)

}
