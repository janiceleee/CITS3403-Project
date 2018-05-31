var mongoose = require("mongoose");
var session = require('express-session');
require("../models/db")
require("../models/announcement");

var annon = mongoose.model('Announcements');

//retrieve
module.exports.announcement = index;

function index(req, res, next){
    console.log(req.body);
    if (req.session.passport === undefined){
        res.render('request', {msg:'please log in'});
    } else {
        annon.find().exec(
            function(err, data){
                if(err){
                    res.render('error', {
                        message:err.message,
                        error:err
                    })
                }else{
                    console.log('Find complete');

                    res.render('announcement', {title: 'Announcements', announcements:data, user:req.user});
                        
                }
            }
        );
    }
}

module.exports.newAnnon = function(req, res, next){
    sess = req.session;
    
    if(sess.passport.user == req.user.username){
    var d = new Date();
    var newA = new annon({
        title: req.body.title, 
        description: req.body.announcement, date: d, author: req.user.firstname});
    newA.save(function(err,data){
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
}

module.exports.delAnnon = function(req, res, next){
    console.log(req.session.passport);
    //if(req.session.passport.user == author){
        annon.remove({_id:req.params.id, author:req.session.passport.user}, function(err,data){
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