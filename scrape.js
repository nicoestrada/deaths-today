const request = require('request')
const cheerio = require('cheerio')
const moment = require('moment')
const fs = require('fs')
//const writeStream = fs.createWriteStream(`${moment.defaultFormat}.html`);

const YESTERDAY = moment().subtract(1, 'day')
const currMonth = YESTERDAY.format('MMMM')

request(`https://en.wikipedia.org/wiki/Deaths_in_2022#${YESTERDAY}`, (error,
response, html) => {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        $('.mw-parser-output').each((i, el) => {
            const currDay = $(el)
                .find('.mw-headline')
                .text();
   
            console.log(currDay);
        })

        // const mwParserOutput = $('.mw-parser-output');
        // console.log(mwParserOutput
        //     .find('h3').text());
    }
 
}

)
