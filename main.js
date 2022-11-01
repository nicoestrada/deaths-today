const request = require('request')
const cheerio = require('cheerio')
const moment = require('moment')
const fs = require('fs')

const URL = 'https://en.wikipedia.org/wiki/Deaths_in_2022'
const yesterday = moment().subtract(1, 'day')
const currMonth = yesterday.format('MMMM')
const currDay = yesterday.format('D')

//html template
const template = (content) => {
    return `
  <!doctype html>
  <html>
    <head>
    </head>
    <body>
        ${content}
    </body>
  </html>`
  }
//end template

const makeDir = (folderPath) => {
    return new Promise((resolve, reject) => {
        fs.mkdir(folderPath, { recursive: true}, (err) => {
            if (err) return reject(err)
            else return resolve(true)
        })
    })
}

//logic
request(URL, async (error, response, body) => {
    if (error) throw new Error('Something is not working right', error)

    const $ = cheerio.load(body);
    const deaths = $('h3').first().next().next().next().next().next('ul').text()

    const dir = `./public/${yesterday.format('YYYY/MMMM')}`
    const filename = `${yesterday.format('D')}.html`
    let created = await makeDir(dir);
    fs.writeFileSync(`${dir}/${filename}`, template(deaths))

    console.log("Success...check the root folder")
})