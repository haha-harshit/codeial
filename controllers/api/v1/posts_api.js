const Comment = require('../../../models/comments');
const Post = require('../../../models/posts');
const User = require('../../../models/user');
const { post } = require('../../../routes');

module.exports.index = async function(req, res){

    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });



    return res.json(200, {
        message: 'List of Posts',
        posts: posts
    })
};


module.exports.delete_post = async function(req, res){
    try{
        let post = await Post.findById(req.params.id);
// .id means converting id in string format
// also the first security check that user deleting the post is the owner of the post      
        if(post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post: req.params.id});

        // if(req.xhr){
        //     return res.status(200).json({
        //         data: {
        //             post_id: req.params.id
        //         },
        //         message: 'Post Deleted!'
        //     });
        // }


        // req.flash('success', 'Post Deleted!');
            return res.json(200, {
                message: 'Post and comments deleted!'
            });
        }else{
            return res.json(401, {
                message: 'You cannot delete this post'
            });
        }

    }catch(err){
        // req.flash('error', 'Cannot Delete!');
        console.log('*******', err);
        return res.json(500, {
            message: 'Internal Server Error!'
        });
    };
};
