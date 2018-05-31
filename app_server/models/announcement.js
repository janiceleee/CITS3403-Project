var mongoose = require('mongoose');

var announcementSchema = new mongoose.Schema(
    {
        title:String,
        description: String,
        author: String,
        date: String,
    }
);


mongoose.model('Announcements', announcementSchema, 'announcements');
