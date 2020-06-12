const nodemailer = require('nodemailer')


const sendmail = async (req, res, userMail, subject, text) =>{
    try{
        console.log(userMail, "userMail")
        const mailOptions = {
            from: 'mastrotesting4395@gmail.com',
            to: userMail, 
            subject: subject,
            text: text
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

    }catch(error){
        console.log(error)
    }
}

module.exports = { sendmail };