module.exports.profile = function(req, res){
    return res.render('user_profile',{
        title: 'Your Profile'
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