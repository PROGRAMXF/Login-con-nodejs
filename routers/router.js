const express = require('express');
const { register } = require('../controllers/authControllers');
const router = express.Router();

//llamamos a la conexion de la db
//const conexion = require('../database/db');

const authControllers = require('../controllers/authControllers');

//router para las vistas


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



//routers para los metodos del controller

router.post('/register', authControllers.register);
router.post('/login', authControllers.login);

module.exports = router;