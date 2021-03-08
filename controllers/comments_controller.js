const Comment = require('../models/comments');
const Post = require('../models/posts');
const User = require('../models/user');
const Like = require('../models/likes');

const commentsMailer = require('../mailer/comments_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');


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
            
            comment = await comment.populate('user', 'name email').execPopulate();


            let job = queue.create('emails', comment).attempts(5).save(function(err){
                if(err){
                    console.log('error in sending to the queue!', err);
                    return;
                }
                console.log('job enqueued', job.id);
                
            });

            if (req.xhr){
                
    
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });
            }

            //used in comment_email_worker.js
            // commentsMailer.newComment(comment);
            console.log('ho');
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
        // if ( comment.user == req.user.id ){
            let postId = comment.post;

            comment.remove();
            
            let post = Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}});

            // destroy the associated likes
            await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});
            
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }

            req.flash('success', 'Comment Deleted!');
            return res.redirect('back');
            // console.log('I deleted comment from my post!');
        // }
        // else{
        //     return res.redirect('back');
        // }
    }catch(err){
        req.flash('error', 'Cannot delete!');        
        return;
    }

}