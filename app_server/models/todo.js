mongoose = require('mongoose');

todoSchema = new mongoose.Schema(
    {
        todo:String,
        date: Date,
        author: String,
    }
)

mongoose.model('ToDo', todoSchema, 'todos');