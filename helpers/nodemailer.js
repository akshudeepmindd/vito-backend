const nodemailer = require('nodemailer')

// const transporter = async (req, res, next) =>{
//     try{
//         return  
//         // return transporter
//     }catch(error){
//         next(error)
//     }
// }

// const transporter = nodemailer.createTransport({ 
//     service: 'Sendgrid',
//     auth: { 
//         user: process.env.SENDGRID_USERNAME, 
//         pass: process.env.SENDGRID_PASSWORD 
//     }
// });


const sendmail = async (req, res, userMail, subject, text) =>{
    try{
        console.log(userMail, "userMail")
        const mailOptions = {
            from: 'mastrotesting4395@gmail.com',
            to: userMail, 
            subject: subject,//'Account Verification Token',
            text: text//'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token + '.\n' 
        };
       const transporter = nodemailer.createTransport({ 
            service: 'Gmail',
            port: 465,
            secure: true,
            auth: { 
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        });
        const mail = await transporter.sendMail(mailOptions)
        // if(!mail){
        //     throw Error('Email is not present');
        // }
        return mail
        // transporter.sendMail(mailOptions, function (err) {
        //             if (err) { return res.status(500).send({ msg: err.message }); }
        //             res.status(200).send('A verification email has been sent to ' + user.email + '.');
        //         })
    }catch(error){
        console.log(error)
    }
}

module.exports = { sendmail };