const axios = require('axios').default;
const Handlebars = require('handlebars');
const fs = require('fs');

axios.get('https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22')
.then((response) => {
  console.log(response.data);
  var jsonData = JSON.stringify(response.data,null);
  fs.writeFileSync('sample.json', jsonData , function(err) {
    if (err) {
        console.log(err);
    }
    });
    const inFile = './Template.hbs';
    const outFile = './Final.html';

    const data = require('./sample.json');

    const source = fs.readFileSync(inFile, 'utf8');
    const template = Handlebars.compile(source, { strict: true });
    const result = template(data);

    console.log(result);

    fs.writeFileSync(outFile, result);
    console.log(`File written to ${outFile}`);
  });