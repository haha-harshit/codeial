const Post = require('../models/posts');
const Comment = require('../models/comments');

module.exports.create_post = async function(req, res){
    try{
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        
        return res.redirect('back');

    }catch(err){
        console.log('Error!',err);
        return;
    }
};

module.exports.delete_post = async function(req, res){
    try{
        let post = await Post.findById(req.params.id);
// .id means converting id in string format
// also the first security check that user deleting the post is the owner of the post      
        if(post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post: req.params.id});
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log('Error',err);
        return;
    };
};