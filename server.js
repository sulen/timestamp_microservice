// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//timestamp service:
const parseTime = (time) => {
  let date;
  if (time === "") {
    date = new Date();
    return {"unix": date.getTime(), "utc" : date.toUTCString() };
  } else if (!+time) {
    date = new Date(time);
    if (date == 'Invalid Date') {
      return {"unix": null, "utc" : "Invalid Date" };
    } else {
      return {"unix": date.getTime(), "utc" : date.toUTCString() };
    }
  } else {
    date = new Date(+time);
    return {"unix": date.getTime(), "utc" : date.toUTCString() };
  }
};

app.route('/api/timestamp').get((req, res) => {
  res.json(parseTime(''));
});

app.route('/api/timestamp/:date_string').get((req, res) => {
  res.json(parseTime(req.params.date_string));
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});