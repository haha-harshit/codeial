const Post = require('../models/posts');
const Comment = require('../models/comments');
const Like = require('../models/likes');
const { likes } = require('./users_controllers');

module.exports.create_post = async function(req, res){
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        // check if AJAX req 
        if(req.xhr){

            post = await post.populate('user', 'name').execPopulate();

            return res.status(200).json({
                data: {
                    post: post 
                },
                message: "Post created!"
            });
        }

        // for flash message
        req.flash('success', 'Post uploaded!');
        
        return res.redirect('back');

    }catch(err){
        req.flash('error', 'Cannot Post!');
        return res.redirect('back');
    }
};

module.exports.delete_post = async function(req, res){
    try{
        let post = await Post.findById(req.params.id);
// .id means converting id in string format
// also the first security check that user deleting the post is the owner of the post      
        if(post.user == req.user.id){

            await Like.deleteMany({likeable: post, onModel: 'Post'});
            await Like.deleteMany({_id: {$in: post.comments}});


            post.remove();

            await Comment.deleteMany({post: req.params.id});

            if(req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: 'Post Deleted!'
                });
            }


            req.flash('success', 'Post Deleted!');
            return res.redirect('back');
        }else{
            req.flash('error', 'You cannot delete this post!');
            return res.redirect('back');
        }

    }catch(err){
        req.flash('error', 'Cannot Delete!');
        return res.redirect('back');
    };
};