const Comment = require('../models/comments');
const Post = require('../models/posts');

module.exports.create_comment = function(req, res){
    Post.findById(req.body.post, function(err, post){
        if(err){
            console.log('Post does not exist!');
            return res.redirect('/');
        }
        else{
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err, comment){
                if(err){
                    console.log('Error in creating Comment on this Post!');
                    return res.redirect('back');
                }
                else{
                    post.comments.push(comment);
                    post.save();
                    console.log('You commented!')
                    return res.redirect('back');
                }
            });
        }
    });
};