const request = require('request')
const cheerio = require('cheerio')
const moment = require('moment')
const fs = require('fs')

const URL = 'https://en.wikipedia.org/wiki/Deaths_in_2022'
const yesterday = moment().subtract(1, 'day')
const currMonth = yesterday.format('MMMM')
const currDay = moment().format('D')

const writeStream = fs.createWriteStream(`${moment().format('MMMM_Do_YYYY')}.html`);

request(URL, (error, response, html) => {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        const deaths = $('h3').first().next().next().next('ul').text()

        writeStream.write(`${currMonth} ${currDay}, ${moment().format('YYYY')} \n ${deaths}`)
    } else {
        throw new Error('Something is not working right', error)
    }
    console.log("Success...check the root folder for the file")
})