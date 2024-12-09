// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
    res.json({ greeting: 'hello API' });
});

app.get('/api/:date?', (req, res) => {
    const dateParam = req.params.date;
    const dateParamRegex = /^[0-9]+$/;
    const numbersOnly = dateParamRegex.test(dateParam);

    if (req.params.date == null) {
        const unixTimeStamp = Date.now();
        const actualDate = new Date(unixTimeStamp);
        const utcDate = actualDate.toUTCString();
        res.json({ unix: unixTimeStamp, utc: utcDate });
        return;
    }

    if (!numbersOnly) {
        const unixTimeStamp = Date.parse(dateParam);
        const utcTime = new Date(unixTimeStamp).toUTCString();

        unixTimeStamp
            ? res.json({ unix: unixTimeStamp, utc: utcTime })
            : res.json({ error: 'Invalid Date' });
    } else {
        unixTimeStamp = parseInt(dateParam);
        actualDate = new Date(unixTimeStamp);
        utcDate = actualDate.toUTCString();

        res.json({ unix: unixTimeStamp, utc: utcDate });
    }
});

// listen for requests :)
var listener = app.listen(3000 /* process.env.PORT */, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});
