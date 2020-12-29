// const { urlencoded } = require('express');
const express = require('express');
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

//cookie
const cookieParser = require('cookie-parser');

//database-connectivity
const db = require('./config/mongoose');
const User = require('./models/user');

const app = express();

//middleware
app.use(express.urlencoded());
app.use(cookieParser());
//static files
app.use(express.static('./assets'));

//layouts
app.use(expressLayouts);

//extract styles and scripts from sub-pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//using express router
app.use('/', require('./routes'));

//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');
// app.use(express.urlencoded());

app.listen(port, function(err){
    if(err){
        //interpolition: use(`${}`)
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`server is running on port: ${port}`);
});