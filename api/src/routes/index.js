const { Router } = require('express');
const { auth, requiresAuth } = require('express-openid-connect'); // se usa con el middleware para securizar las rutas que requieren autenticación
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
