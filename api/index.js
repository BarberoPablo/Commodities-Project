//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const port = process.env.PORT || 3000;
require('dotenv').config();
const { auth, requiresAuth } = require('express-openid-connect');

server.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: process.env.ISSUER_BASE_URL ,
    baseURL: process.env.BASE_URL ,
    clientID: process.env.CLIENT_ID ,
    secret: process.env.SECRET ,
    idpLogout: true,
  })
);

server.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged Out")
});

server.get('/profile', requiresAuth(), (req, res) => {  //This route reauieres to be authenticated to be able to get it
  res.send(JSON.stringify(req.oidc.user));
});

// Syncing all the models at once.
//conn.sync({ force: true }).then(() => {  // COMENTADO PARA PODER LEVANTAR LA APP SIN DB
  server.listen(port, () => {
    console.log(`Server listening at Port ${port}`); // eslint-disable-line no-console
  });
//});