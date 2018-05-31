var mongoose = require("mongoose");
require("../models/db")
require("../models/Project");

var Project = mongoose.model('Project');



//Retrieve
module.exports.prjList = function(req, res, next){
    console.log(req.params.id);
    if (req.session.passport === undefined){
        res.render('request', {msg:'please log in'});
    } else {
        Project.find().exec(
            function(err, data){
                if(err){
                    res.render('error', {
                        message:err.message,
                        error:err
                    })
                }else{
                    console.log('Find complete');

                    res.render('projectList', {
                        title: 'List of projects', projects:data, user:req.user});
                        
                }
            }
        )
    }
}

function index(req, res, next){
    var id = 0;
    if (req.params.id === undefined) {
        id = req.body.id;
    } else if (req.body.id === undefined) {
        id = req.params.id;
    }
    if (req.session.passport === undefined){
        res.render('request', {msg:'please log in'});
    } else {
        Project.find({_id:id}).exec(
            function(err, data){
                if(err){
                    res.render('error', {
                        message:err.message,
                        error:err
                    })
                }else{
                    res.render('project', { title:'Project', projectId:id, projects:data, user:req.user});
                        
                }
            }
        )
    }
}

module.exports.project = index;

module.exports.newPrj = function(req, res, next){
    var newProject = new Project({
        title: req.body.title, 
        description: req.body.description});
    newProject.save(function(err,data){
        if(err){
            console.log(err);
            res.status(500);
            res.render('error',{
                message:err.message,
                error:err
            });
        }else{
            console.log(data, ' saved');
            //index(req,res,next);
            res.redirect('/index/project/' + data._id);
        }
    });   
}

module.exports.newTask = function(req, res, next){
    var newTask = {
        title: req.body.title, 
        deadline: req.body.deadline};
    
    Project.update({_id:req.params.id}, {$push: {tasks:newTask}}, function(err,data){
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

module.exports.delPrj = function(req, res, next){
    Project.remove({_id:req.params.id}, function(err,data){
        if(err){
            console.log(err);
            res.status(500);
            res.render('error',{
                message:err.message,
                error:err
            });
        }else{
            console.log(req.params.id, ' removed');
            res.redirect('/index/project');
        }
    });   
}

module.exports.delTask = function(req, res, next){
    Project.findOne({_id: req.params.pid}, function(err, data){
        if(err){
            console.log(err);
            res.status(500);
            res.render('error',{
                message:err.message,
                error:err
            });
        }else{
            //console.log(data.tasks);
            data.tasks.id(req.params.tid).remove();
            data.save( function(err,data){
                if(err){
                    console.log(err);
                    res.status(500);
                    res.render('error',{
                        message:err.message,
                        error:err
                    });
                }else{
                    //data.tasks.id(req.params.tid).remove();
                    
                    console.log(req.params.tid, 'of', req.params.pid, ' removed');
                    res.redirect('/index/project/' + req.params.pid);
                }
            });   

        }
    });
        
}
//module.exports = prjList;