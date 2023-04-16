const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const app = express();

//configuramos el motor de plantillas
app.set('view engine', 'ejs');

//luego configuramos la carpeta public para archivos estaticos
app.use(express.static('public'));

//ahora configuramos node para que procese estos datos
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//configuramos las variables de entorno
dotenv.config({path: './env/.env'});

//configuramos las cookies
app.use(cookieParser());

//llamar al router
app.use('/', require('./routers/router'))

//para eliminar el cache y que no se pueda volver con el boton de back luego de que hacemos un logout
app.use(function(req, res, next){
    if(!req.user)
    res.header('Cache control private, no-cache, no store, must-revalidate');
    next();
});



app.listen(3000, ()=>{
    console.log('Servidor funcionando');
});