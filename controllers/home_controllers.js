module.exports.home = function(req, res){
    return res.render('home', {
        title: "Homepage"
    });
};

module.exports.posts = function(req, res){
    return res.render('posts', {
        title: 'Your Posts'
    });
};

module.exports.friends = function(req, res){
    return res.render('friends', {
        title: 'Your Friends'
    });
};
