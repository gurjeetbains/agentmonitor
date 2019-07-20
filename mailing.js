const nodemailer = require('nodemailer');
const ejs = require('ejs');
const emailHOST, portNo;
let transporter = nodemailer.createTransport({//create a transporter for sending emails Office365 service is currently we use
  host: emailHOST,//mention your email host here
  port: portNo,//Mention the port number here
  secure: false
});
let mailFailagents = async function (location, moduleName) {//Mail data to these locations
  ejs.renderFile(__dirname + "/templates/fail.ejs", { location: location, moduleName: moduleName }, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      var mailOptions = {
        from: 'sender@mailinator.com', // sender address
        to: 'reciever@mailinator.com', // list of receivers
        subject: 'Alert: ' + moduleName + ' is not running in below agents.', // Subject line
        html: data// html body
      };
      sendMail(mailOptions);
    }
  });
}
function sendMail(mailOptions) {
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: ' + info.response);
  });
}
module.exports = mailFailagents
