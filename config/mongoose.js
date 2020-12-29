const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/codeial_development');

const db = mongoose.connection;

db.on('error', console.error.bind('Error in connecting to DB!'));

db.once('open', function(){
    console.log('Sucessfully connected to DB!')
}); 

mongoose.exports = db;