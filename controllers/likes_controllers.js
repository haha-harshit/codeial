const Like = require('../models/likes');
const Post = require('../models/posts');
const Comment = require('../models/comments');
const { findOne } = require('../models/likes');



module.exports.toggleLike = async function(req, res){
    try{
 
        // likes/toggle/?id=abcd&type=Post/Comment
        let likeable;
        let deleted = false;

        if(req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');
        }else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        //function to check if a like already exists(find if already exists)
        let existingLike = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        });

        //if like already exist(then do this - delete the like on toggling if exists)
        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();

            existingLike.remove();

            deleted = true;
        }else{
            // make a new like
            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            });

            likeable.likes.push(newLike._id);
            likeable.save();

            if(req.query.type == 'Post'){
                req.flash('success', 'You liked a Post!');
            }else{
                req.flash('success', 'You liked a Comment!');
            }
            
        }

        if(req.xhr){
            return res.status(200).json({
                message: 'Request Successful!',
                data: {
                    deleted: deleted
                }
            });            
        }
        

        return res.redirect('back');
        // return res.json(200, {
        //     message: 'Request Successful!',
        //     data: {
        //         deleted: deleted
        //     }
        // });


    }
    catch(err){
        console.log(err);
        // req.flash('error', 'Server Error!');
        // return res.redirect('back');
        return res.json(500, {
            message: 'Internal server error!'
        });
    }
}