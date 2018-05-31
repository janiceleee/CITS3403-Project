var express = require('express');
var session = require('express-session');
var ctrlProj = require('../controllers/projects');
var ctrlAnnon = require('../controllers/announcements');
var ctrlTodo = require('../controllers/todo');
var ctrlAcc = require('../controllers/account');

var passport = require('passport');

var router = express.Router();

/**Get account page */
router.get('/account', ctrlAcc.account);
router.post('/account', ctrlAcc.change);
router.post('/account/delete', ctrlAcc.delete);


/* Get announcement page. */
router.get('/announcement', ctrlAnnon.announcement);
router.post('/announcement', ctrlAnnon.newAnnon);
router.get('/announcement/delete/:id', ctrlAnnon.delAnnon);

/*Get todo page*/
router.get('/todo', ctrlTodo.todo);
router.post('/todo', ctrlTodo.newTodo);
router.get('/todo/delete/:id', ctrlTodo.delTodo);


router.get('/project', ctrlProj.prjList);
router.get('/project/:id', ctrlProj.project);
router.post('/project/new', ctrlProj.newPrj);
router.get('/project/delete/:id', ctrlProj.delPrj);
router.post('/project/newtask/:id', ctrlProj.newTask);
router.get('/project/:pid/delete/:tid', ctrlProj.delTask);





module.exports = router;