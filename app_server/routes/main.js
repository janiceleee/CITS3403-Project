var express = require('express');
var ctrlMain = require('../controllers/main');
var ctrlAcc = require('../controllers/account');

var router = express.Router();

/* GET home page. */
router.get('/', ctrlMain.home);

/*Register page*/
router.get('/register', ctrlAcc.regForm);
router.post('/register', ctrlAcc.regist);

/*Login page*/
router.get('/login', ctrlAcc.loginForm);
router.post('/login', ctrlAcc.login);
router.get('/logout', ctrlAcc.logout);

/*Meet Our Team page */
router.get('/meetourteam', ctrlMain.meetourteam);
module.exports = router;

/*Reference page */
router.get('/reference', ctrlMain.reference);
module.exports = router;