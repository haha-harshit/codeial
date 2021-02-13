const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//authentication using passport
passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passReqToCallback: true
    },
    function(req, email, password, done){
        //find the user
        User.findOne({email: email}, function(err, user){
            if(err){
                req.flash('error', err);
                return done(err);
            }
            if( !user || user.password!= password ){
                req.flash('error', 'Invalid Username/Password');
                return done(null, false);
            }

            return done(null, user);
        });
    }
));


//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    console.log('serialize done');
    done(null, user.id);
});

//De-serializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding User! ---> passport')
            return done(err);
        }
        console.log('de-serialize done');
        return done(null, user);
    })
});


// chech if user is authenticated
passport.checkAuthentication = function(req, res, next){
    // if logged-in
    if (req.isAuthenticated()){
        return next();
    }
    // if not logged-in
    return res.redirect('/log-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // req.user contains the current logged-in user from the session cookie and we are sending it to the locals for the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;