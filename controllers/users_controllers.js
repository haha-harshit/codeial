const User = require("../models/user");

module.exports.homepage = function(req, res){
    return res.render('user_home', {
        title: 'Homepage'
    });
};

module.exports.profile = function(req, res){
    return res.render('user_profile',{
        title: req.user.name
    });
};

module.exports.likes = function(req, res){
    return res.render('liked_pages',{
        title: 'Liked Pages'
    });
};

module.exports.posts = function(req, res){
    return res.render('posts', {
        title:'Your Posts'
    });
};

module.exports.friends = function(req, res){
    return res.render('friends', {
        title: 'Your Friends'
    });
};