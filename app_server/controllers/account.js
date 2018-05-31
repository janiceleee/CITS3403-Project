var mongoose = require("mongoose");
var session = require('express-session');
var express = require('express');
var passport = require('passport');
require("../models/db")
var Account = require("../models/account");


module.exports.regForm = function(req, res) {
    res.render('register', {title: 'Register' });
};


module.exports.regist = function(req, res) {
    Account.register(new Account({ firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, username : req.body.username}), req.body.password,
    function(err, account) {
        if (err) {
            return res.render('register', { title:'Register', msg : 'registration failed'});
        }
        passport.authenticate('local')(req, res, function () {
            res.redirect('/index/announcement');
        });
    });
};

module.exports.loginForm = function(req, res) {
    res.render('login', {title:'Log In'});
};

module.exports.login =  function(req, res) {
    console.log(req);
   passport.authenticate('local')(req, res, function () {
        res.redirect('/index/announcement');
    });
    
 //passport.authenticate('local', { successRedirect: '/',
 //        failureRedirect: '/login'
 //        failureFlash: true 
//})
    
};

module.exports.logout = function(req, res) {
    req.logout();
    res.redirect('/');
};

module.exports.account = function(req, res) {
    if (req.session.passport === undefined){
        res.render('request', {msg:'please log in'});
    } else {
        res.render('account', {title: 'Account', user:req.user});
    }
}

module.exports.change = function(req, res) {
    if (req.body.firstname != null) {
        Account.update({_id:req.user.id}, {
            firstname: req.body.firstname},
        function(err, account) {
            if (err) {
                return res.render('account', { title:'Account', user:req.user, msg : 'change failed'});
            } 
            passport.authenticate('local')(req, res, function () {
            res.redirect('/index/account');
        });
    });
    }
    if (req.body.lastname != null) {
        Account.update({_id:req.user.id}, {
            lastname: req.body.lastname
    },function(err, account) {
        if (err) {
            return res.render('account', { title:'Account', user:req.user, msg : 'change failed'});
        }
        passport.authenticate('local')(req, res, function () {
            res.redirect('/index/account');
        });
    });
    }
    if (req.body.email != null) {
        Account.update({_id:req.user.id}, {
            email: req.body.email
    },function(err, account) {
        if (err) {
            return res.render('/index/account', { title:'Account', user:req.user, msg : 'change failed'});
        }
        passport.authenticate('local')(req, res, function () {
            account(req, res);
        });
    });
    }
    if (req.body.username != null) {
        Account.update({_id:req.user.id}, {
            username: req.body.username
    },function(err, account) {
        if (err) {
            return res.render('/index/account', { title:'Account', user:req.user, msg : 'change failed'});
        }
        passport.authenticate('local')(req, res, function () {
            res.redirect('/index/account');
        });
    });
    }
    
}

module.exports.delete = function(req, res, next){
    //if (req.session.passport.id === req.user.id){
    passport.authenticate('local')(req, res, function () {
        Account.remove({_id:req.user.id}, function(err,data){
            if(err){
                console.log(err);
                res.status(500);
                res.render('error',{
                    message:err.message,
                    error:err
                });
            }else{
                console.log(req.user.id, ' removed'); 
                res.redirect('/');
            }
        });   
    })
}
    