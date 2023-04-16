const express = require('express');
const { register } = require('../controllers/authControllers');
const router = express.Router();

//llamamos a la conexion de la db
//const conexion = require('../database/db');

const authControllers = require('../controllers/authControllers');

//router para las vistas


router.get('/', authControllers.isAuthenticated, (req, res)=>{
    
    res.render('index', {user:req.user});
});

//ruta para el login
router.get('/login', (req, res)=>{
    res.render('login',{alert:false});
});

//ruta para el register
router.get('/register', (req, res)=>{
    res.render('register');
});



//routers para los metodos del controller

router.post('/register', authControllers.register);
router.post('/login', authControllers.login);
router.get('/logout', authControllers.logout);

module.exports = router