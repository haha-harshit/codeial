const Comment = require('../models/comments');
const Post = require('../models/posts');
const User = require('../models/user');

const { post } = require('../routes');
const { posts } = require('./users_controllers');

module.exports.create_comment = async function(req, res){
    try{
        let post = await Post.findById(req.body.post);

        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            post.save();
            req.flash('success', 'You commented!');
            return res.redirect('back');
        }

    }catch(err){
        req.flash('error', 'Cannot comment!');
        return;
    }
};

module.exports.delete_comment = async function(req, res){
    try{
        let comment = await Comment.findById(req.params.id)
        // .id means converting id in string format
        // also the first security check that user deleting the comment is the owner of the comment
        if ( comment.user == req.user.id || comment.post.user == req.user.id){
            let postId = comment.post;

            comment.remove();
            
            let post = Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}});
            req.flash('success', 'Comment Deleted!');
            return res.redirect('back');
            // console.log('I deleted comment from my post!');
        }
        else{
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error', 'Cannot delete!');        
        return;
    }

}