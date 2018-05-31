var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema(
    {
        title: String,
        deadline: String
    }
);

var projectSchema = new mongoose.Schema(
    {
        title:String,
        description: String,
        tasks: [taskSchema] 
    }
);


mongoose.model('Project', projectSchema, 'projects');
