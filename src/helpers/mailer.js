/**
 * File this containts comment logic for send mail.
 */

const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SMTP_HOST,
    port: process.env.EMAIL_SMTP_PORT,
    secure: process.env.EMAIL_SMTP_SECURE, // lack of ssl commented this. You can uncomment it.
    requiredTLS: true,
    auth: {
        user: process.env.EMAIL_SMTP_USERNAME,
        pass: process.env.EMAIL_SMTP_PASSWORD,
    },
});

exports.send = function (from, to, subject, html) {
    // visit https://nodemailer.com/ for more options
    //console.log(html)
    return transporter.sendMail({
        from: from,
        to: to,
        subject: subject,
        //text: text,
        html: html,
    });
};
