const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const app = express();

//configuramos el motor de plantillas


//definimos las rutas
app.get('/', (req, res)=>{
    res.send('Hol fer')
});


app.listen(3000, ()=>{
    console.log('Servidor funcionando');
});