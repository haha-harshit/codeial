const Post = require("../models/posts");
const User = require("../models/user");
const fs = require('fs');
const path = require('path');


module.exports.update_profile = function(req, res){
    return res.render('update_profile',{
        title: 'Codeial | Update Profile'
    });
};


module.exports.update_profile_ok = async function(req, res){
    
    if(req.user.id == req.params.id){
        
        try{
            let user = await User.findById(req.params.id);
            User.uploadAvatar(req, res, function(err){
                if(err){
                    console.log('****Multer Error: ', err);
                }
                
                console.log(req.file);

                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){

                    // fs.stat(user.avatar, function(err, stats){
                    //     console.log(stats);
                    //     if(err){

                    //     }
                    // })

                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }
                    // this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                req.flash('success', 'Profile Updated');
                return res.redirect('back');
            });

        }catch(err){
            req.flash('error', err);    
            return res.redirect('back');
        }
        // User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
        //     req.flash('success', 'Profile updated!');
        //     return res.redirect('back');
        // });
    }
    else{
        req.flash('error', 'Unauthorized!');
        return res.status(401).send('Unauthorized');
    }
};