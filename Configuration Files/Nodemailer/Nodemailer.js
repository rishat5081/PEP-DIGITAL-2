"use strict";
var nodemailer = require("nodemailer")



async function sendEmail_to_ConfirmEmail(userEmail, htmlFile, subject) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: process.env.host,
        port: process.env.port,
        secure: process.env.secure,
        auth: {
            user: process.env.user,
            pass: process.env.pass
        }
    })


    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: `"${process.env.web_Title}" ${process.env.web_Email}`, // sender address
        to: `${userEmail}`, // list of receivers
        subject: `${subject}`, // Subject line
        text: "Hello world?", // plain text body
        html: `${htmlFile}`, // html body
    });

    console.log(info)
    if (info) return true
    else return false

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}


module.exports = { sendEmail_to_ConfirmEmail }


// // sadasd('sdadasd','asdasdas','asdasdas')
// // main().catch(console.error);




// "use strict";
// const nodemailers = require("nodemailer");

// // async..await is not allowed in global scope, must use a wrapper
// async function main() {
//     // create reusable transporter object using the default SMTP transport
//     let transporter = nodemailers.createTransport({
//         host: "smtp.gmail.com",
//         port: 465,
//         secure: true,
//         auth: {
//             user: "voip.itz.solutions@gmail.com", // generated ethereal user
//             pass: "icnnrefdmiovthis", // generated ethereal password
//         },

//     });

//     // send mail with defined transport object
//     let info = await transporter.sendMail({
//         from: '"Fred Foo 👻" <foo@example.com>', // sender address
//         to: "bar@example.com, baz@example.com", // list of receivers
//         subject: "Hello ✔", // Subject line
//         text: "Hello world?", // plain text body
//         html: "<b>Hello world?</b>", // html body
//     });

//     console.log("info " + info)
//     console.log("Message sent: %s", info.messageId);
//     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//     // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

// main().catch(console.error);