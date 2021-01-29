const Post = require("../models/posts");
const User = require("../models/user");

module.exports.update_profile = function(req, res){
    return res.render('update_profile',{
        title: 'Codeial | Update Profile'
    });
};


module.exports.update_profile_ok = function(req, res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
            return res.redirect('back');
        });
    }
    else{
        return res.status(401).send('Unauthorized');
    }
}