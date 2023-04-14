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
exports.login = async(req, res)=>{
    try{
        const user = req.body.user;
        const pass = req.body.pass;
        
        if(!user || !pass){
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
            conexion.query('SELECT * FROM users WHERE user = ?', [user], async (error, results)=>{
                if(results.length == 0 || ! (await bcryptjs.compare(pass, results[0].pass))){
                    res.render('login', {
                        alert:true,
                        alertTitle:"Error",
                        alertMessage:"Usuario y/o Password incorrectas",
                        alertIcon:'error',
                        showConfirmButton: true,
                        timer:false,
                        ruta:'login'
                    })
        
                }else{
                    //inicio de sesion ok
                    const id = results[0].id
                    const token = jwt.sign({id:id}, process.env.JWT_SECRETO, {
                        expiresIn: process.env.JWT_TIEMPO_EXPIRA
                    })
                    //generamos el token sin fecha de expiracion
                    //const token = jwt.sign({id:id}, process.env.JWT_SECRETO)
                    console.log("TOKEN: " + token + "para el USUARIO : " + user)

                    const cookiesOptions = {
                        expires: new Date(Date.now()+ process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                        httpOnly:true 
                    }
                    res.cookie('jwt', token, cookiesOptions)
                    res.render('login', {
                        alert:true,
                        alertTitle:"Conexion exitosa",
                        alertMessage:"!Login Correcto!",
                        alertIcon:'success',
                        showConfirmButton: false,
                        timer:800,
                        ruta:''
                    })
                }

            })
        }

    }catch(error){
        console.log(error)
    }
}