mongoose = require('mongoose');

todoSchema = new mongoose.Schema(
    {
        todo:String,
        date: String,
        author: String,
    }
)

mongoose.model('ToDo', todoSchema, 'todos');
