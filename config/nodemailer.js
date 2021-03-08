
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

// path which sends the e-mail
let transporter = nodemailer.createTransport({
    service: 'gmail', 
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: '***',
        pass: '***'
    }
});

// when sending an HTML e-mail
let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template){
            if(err){
                console.log('error in rendering template');
                return;
            }else{
                mailHTML = template;
            }
        }
    )
    
    return mailHTML;
}

// exporting the above two properties
module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
};
