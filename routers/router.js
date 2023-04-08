const express = require('express');
const router = express.Router();

//llamamos a la conexion de la db
//const conexion = require('../database/db');

router.get('/', (req, res)=>{
    
    res.render('index.ejs');
});

//ruta para el login
router.get('/login', (req, res)=>{
    res.render('login.ejs');
});

//ruta para el register
router.get('/register', (req, res)=>{
    res.render('register.ejs');
});

module.exports = router;