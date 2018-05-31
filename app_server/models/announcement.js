var mongoose = require('mongoose');

var announcementSchema = new mongoose.Schema(
    {
        title:String,
        description: String,
        author: String,
        date: Date,
    }
);


mongoose.model('Announcements', announcementSchema, 'announcements');