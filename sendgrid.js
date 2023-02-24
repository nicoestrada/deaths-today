require("dotenv").config();
var today = moment().subtract(1, 'day')
const fs = require('fs')
var request = require('request')
const moment = require('moment')
const html = fs.readFileSync(__dirname + '/public/index.html', 'utf8')
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(`${process.env.SENDGRID_API_KEY}`)

request(
    {
        method: 'GET',
        url: 'https://api.sendgrid.com/v3/marketing/contacts',
        headers: { authorization: `Bearer ${process.env.SENDGRID_API_KEY}` },
    },
    function (error, response, body) {
        if (error) throw new Error(error)
        let json = JSON.parse(body)
        let { result: contacts } = json
        let personalizations = contacts.map((x) => ({
          to: {
            email: x.email,
          },
        }))
        const msg = {
            personalizations,
            from: {
              email: 'no-reply@deaths.today',
              name: `Notable Deaths`,
            },
            subject: `Notable Deaths: ${today.format('dddd DD MMMM YYYY')}`,
            text: 'Text not available. See latest current events at https://deaths.today',
            html,
          }
          sgMail.send(msg)
        }
    )