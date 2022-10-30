const request = require('request')
const cheerio = require('cheerio')
const moment = require('moment')
const fs = require('fs')
//const writeStream = fs.createWriteStream(`${moment.defaultFormat}.html`);

const YESTERDAY = moment().subtract(1, 'day')
const currMonth = YESTERDAY.format('MMMM');

request(`https://en.wikipedia.org/wiki/Deaths_in_2022#${YESTERDAY}`, (error,
response, html) => {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        const day = $('h3').first().next().text()
        const deaths = $('h3').first().next().next('ul').text()

        console.log(
            currMonth,
            day,'\n',
            deaths
        )

        // $('.mw-parser-output').each((i, el) => {
        //     const currDay = $('ul').children().first().text();
        //         //.find('.mw-headline')
        //         //.text();
   
        //     console.log(currDay);
        // })

        // const mwParserOutput = $('.mw-parser-output');
        // console.log(mwParserOutput
        //     .find('h3').text());
    }
 
}

)
