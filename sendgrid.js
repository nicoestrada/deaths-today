const sgMail = require('@sendgrid/mail')
const fs = require('fs')
// var request = require('request')
const moment = require('moment')
const yesterday = moment().subtract(1, 'day')
const html = fs.readFileSync(__dirname + '/public/index.html', 'utf8')
var today = moment().subtract(1, 'day')
require('dotenv').config();
sgMail.setApiKey(`${process.env.SENDGRID_API_KEY}`)
//new below
const client = require('@sendgrid/client');
client.setApiKey(`${process.env.SENDGRID_API_KEY}`);


const request = {
  url: "https://api.sendgrid.com/v3/marketing/contacts",
  methods: 'GET',
  headers: { authorization: `Bearer ${process.env.SENDGRID_API_KEY}` },
}

client.request(request)
  .then(([response, body]) => {
    let json = JSON.parse(body)
    let { result: contacts } = json
    let personalizations = 
      contacts?.map((x) => ({
      to: {
        email: x.email,
      },
    }))
    
    const msg = {
      personalizations,
      from: {
        email: 'no-reply@deaths.today',
        name: `Notable Deaths of the Day`,
      },
      subject: `Notable Deaths: ${yesterday.format('MMMM DD, YYYY')}`,
      text: 'See latest notable deaths at https://deaths.today',
      html,
    }
    sgMail
    .send(msg)
    .then(() => {
      console.log('**********Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
  })
  .catch(error => {
    console.error(error);
  })


// request(
//   {
//     method: 'GET',
//     url: 'https://api.sendgrid.com/v3/marketing/contacts',
//     headers: { authorization: `Bearer ${process.env.SENDGRID_API_KEY}` },
//   },
//   function (error, response, body) {
//     if (error) throw new Error(error)
//     let json = JSON.parse(body)
//     let { result: contacts } = json
//     let personalizations = 
//       contacts?.map((x) => ({
//       to: {
//         email: x.email,
//       },
//     }))
    
//     const msg = {
//       personalizations,
//       from: {
//         email: 'no-reply@deaths.today',
//         name: `Notable Deaths Today`,
//       },
//       subject: `Notable Deaths: ${yesterday.format('MMMM DD, YYYY')}`,
//       text: 'See latest notable deaths at https://deaths.today',
//       html,
//     }
//     sgMail
//       .send(msg)
//       .then(() => {
//         console.log('**********Email sent')
//       })
//       .catch((error) => {
//         console.error(error)
//       })
//   }
// )