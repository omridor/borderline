'use strict';

var nodemailer = require('nodemailer'),
	  config = require('../config');


// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(config.smtpURI);

// setup e-mail data with unicode symbols
var mailOptions = {
    to: 'omridor@gmail.com', // list of receivers
    subject: 'TEST ✔', // Subject line
    text: 'TEST 🐴', // plaintext body
    html: '<b>Hello world 🐴</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});
