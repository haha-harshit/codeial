
const nodeMailer = require('../config/nodemailer');
// const comment = require('../models/comments');

// another way of exporting a method(previously--->> module.exoports = newComment;)
exports.newComment = (comment) => {
    
    let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        from: 'bkharshitbk@gmail.com',
        to: comment.user.email,
        subject: 'New Comment Published!',
        html: htmlString
    }, (err, info) =>{
        if(err){
            console.log('Error in sending the mail', err);
            return;
        }else{
            // console.log('Mail Delivered!', info);
            return;
        }
    });
};