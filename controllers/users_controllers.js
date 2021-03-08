const { user } = require("../config/mongoose");
const Post = require("../models/posts");
const User = require("../models/user");
const Comment = require('../models/comments');

module.exports.homepage = async function(req, res){
    try{
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            },
            populate: {
                path: 'likes'
            }
        }).populate('comments')
        .populate('likes');
    
        let users = await User.find({})
 
        return res.render('user_home',{
            title: 'Homepage',
            posts: posts,
            all_users: users
        });
    }catch(err){
        console.log('Error', err);
        return;
    };
};
// your profile page
module.exports.profile = function(req, res){
        return res.render('user_profile',{
            title: req.user.name,
        });
};

// friend's profile page
module.exports.friends_profile = function(req, res){
    User.findById(req.params.id, function(err, users){
        console.log('friends profile');
        return res.render('friends_profile',{
            title: users.name,
            profile_user: users
        });
    });
};

module.exports.likes = function(req, res){
    return res.render('liked_pages',{
        title: 'Liked Pages'
    });
};

module.exports.posts = function(req, res){
    // Post.find({}, function(err, posts){
    //     return res.render('posts', {
    //         title:'Your Posts',
    //         posts: posts
    //     });
    // });
    Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err, posts){
        return res.render('posts',{
            title: 'Your Posts',
            posts: posts
        });
    });
};

module.exports.friends = function(req, res){
    return res.render('friends', {
        title: 'Your Friends'
    });
};

