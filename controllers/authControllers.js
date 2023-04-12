const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const conexion = require('../database/db');
const{promisify} = require('util'); //trabajamos con promesas / vamos a usar una comunicacion asincrona

//metodo para registrarnos
exports.register = async (req, res)=>{
try {
    const name = req.body.name;
    const user = req.body.user;
    const pass = req.body.pass;
    let passHash = await bcryptjs.hash(pass, 8)
   // console.log(passHash)
   conexion.query('INSERT INTO users SET ?', {user:user, name:name, pass:passHash}, (error, results)=>{
    if(error){
        console.log(error)
    }
    res.redirect('/')
   })
}catch (error){
    console.log(error);
}




}
