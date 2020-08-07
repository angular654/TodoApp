const nodemailer = require('nodemailer');
module.exports =  function send(email, message) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: 'kira.goodwin@ethereal.email',
            pass: 'jgKEsrGg8SeUWMYbR1'
        }
    });

     transporter.sendMail({
        from: '"Node js" <nodejs@example.com>',
        to: email,
        subject: "ToDoApp",
        text: message,
        html: "This <i>message</i> was sent from <strong>Node js</strong> server."
    });
}