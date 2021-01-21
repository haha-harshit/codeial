
// const User = require("../models")
const User = require("../models/user");
const Post = require('../models/posts');
const { use } = require("../routes");

module.exports.home = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('user/homepage');
    }
    console.log(req.cookies);
    // res.cookie('user_id', 25);
    return res.render('home', {
        title: "Codeial"
    });
};


//sign up
module.exports.sign_up = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }
    return res.render('sign_up', {
        title: 'Codeial | Create Account'
    });
};

//sign in and creating session
module.exports.log_in = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('user/profile');
    }
    return res.render('log_in', {
        title: 'Codeial | Login'
    })
}
module.exports.create_Session = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('user/homepage');
    }
    // return res.render('user_home',{
    //     title: req.user.name
    // });
};


//   destroy session  ||  Log-out
module.exports.log_out = function(req, res){
    req.logout();
    return res.redirect('/');
}


//get sign-up data
module.exports.create_account = function(req, res){

    //check for password and confirm password
    if(req.body.password != req.body.confirm_password){
        console.log("confirm password did not match your initial password!")
        return res.redirect('back');
    };

    //check for email if already USED!, if not then create a new user
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log("Email already used!");
            return;
        }
        if(user){
            console.log("User already present");
            return res.render('already_created', {
                title: 'Log In'
            });
        }
        if(!user){
            console.log('creating account...');
            User.create({
                email: req.body.email, 
                password: req.body.password,
                name: req.body.name
            }, function(err, newAccount){
                if(err){
                    console.log('Error in creating account!');
                    return;
                }
                console.log('******', newAccount);
                console.log("Account created successfully!");
                return res.redirect('log-in');
            });
        }

    });
    
};