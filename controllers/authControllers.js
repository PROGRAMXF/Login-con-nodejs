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

//metodo para el login
exports.login = async(req,res)=>{
    try{
        const user = req.body.user;
        const pass = req.body.pass;
        
        if(user || pass){
            res.render('login', {
                alert:true,
                alertTitle:"Advertencia",
                alertMessage:"Ingrese un usuario y password",
                alertIcon:'info',
                showConfirmButton: true,
                timer:false,
                ruta:'login'
            })

        }else{
            conexion.query('SELECT * FROM users WHERE user = ?', [user])
        }

    }catch(error){

    }
}