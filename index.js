// const { urlencoded } = require('express');
const express = require('express');
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const app = express();
//cookie
const cookieParser = require('cookie-parser');

// const app = express();

//database-connectivity
const db = require('./config/mongoose');
const User = require('./models/user');

// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

const MongoStore = require('connect-mongo')(session);

// sass-middleware
const sassMiddleware = require('node-sass-middleware');

// flash
const flash = require('connect-flash');
const customMware = require('./config/middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

// const app = express();

//middleware
app.use(express.urlencoded());
app.use(cookieParser());

//static files
app.use(express.static('./assets'));

// make the uploads path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

//layouts
app.use(expressLayouts);

//extract styles and scripts from sub-pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//using express router
// app.use('/', require('./routes'));

//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    // to-do ---> change secret
    secret: 'blahblah',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: null
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        },function(err){
            console.log(err || 'connect-mongodb setup ok'); 
        }
    )
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser); 

app.use(flash());
app.use(customMware.setFlash);


//using express router
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        //interpolition: use(`${}`)
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`server is running on port: ${port}`);
});