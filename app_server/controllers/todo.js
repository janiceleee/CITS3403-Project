var mongoose = require("mongoose");
var session = require('express-session');
require("../models/db")
require("../models/todo");

var Todo = mongoose.model('ToDo');

//retrieve
module.exports.todo = index;

function index(req, res, next){
    if (req.session.passport === undefined){
        res.render('request', {msg:'please log in'});
    } else {
        Todo.find({author: req.user.username}).exec(
            function(err, data){
                if(err){
                    console.log('error');
                    res.render('error', {
                        message:err.message,
                        error:err
                    })
                }else{
                    console.log('Find complete');

                    res.render('todo', {title: 'To Do', todos:data, user:req.user});
                        
                }
            }
        );
    }
}

module.exports.newTodo = function(req, res, next){
    var d = new Date();
    console.log(req.body);
    var newT = new Todo({
        todo: req.body.todo, date:req.body.date, author: req.user.username});
    newT.save(function(err,data){
        if(err){
            console.log(err);
            res.status(500);
            res.render('error',{
                message:err.message,
                error:err
            });
        }else{
            console.log(data, ' saved');
            index(req,res,next);
        }
    });   
}

module.exports.delTodo = function(req, res, next){
    console.log(req.params.id);
    Todo.remove({_id:req.params.id}, function(err,data){
        if(err){
            console.log(err);
            res.status(500);
            res.render('error',{
                message:err.message,
                error:err
            });
        }else{
            console.log(req.params.id, ' removed');
            index(req,res,next);
        }
    });   
}