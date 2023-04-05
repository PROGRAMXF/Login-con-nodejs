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

//definimos las rutas
app.get('/', (req, res)=>{
    res.send('Hol fer')
});


app.listen(3000, ()=>{
    console.log('Servidor funcionando');
});