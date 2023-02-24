require("dotenv").config();
var today = moment().subtract(1, 'day')
const fs = require('fs')
var request = require('request')
const moment = require('moment')
const html = fs.readFileSync(__dirname + '/public/index.html', 'utf8')
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(`${process.env.SENDGRID_API_KEY}`)
const sendMail = async (msg) => {
    try {
        await sgMail.send(msg);
        console.log("Message sent successfully.")
    } catch (error) {
        console.error(error);

        if (error.response) {
            console.log(error.response.body);
        }
    }
};

sendMail({
    to: "estradanicolas@gmail.com",
    from: {
        email: 'no-reply@deaths.today',
        name: `Deaths Today`,
      },
    subject: `Deaths Today: ${today.format('dddd MMMM DD YYYY')}`,
    text: 'Text not available. See who died at https://deaths.today',
    html,
})