const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const googleFinance = require('google-finance');
const app = express();

app.use(bodyParser.json());

app.get('/api/stocks', (req, res) => {

  function dateToYMD(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
  }

  let today = new Date();
  let yesterdayEpoch = (60 * 60 * 24 * 1000);
  let yearAgoDate = new Date(today - (yesterdayEpoch * 365))
  let yesterdayDate = new Date(today - yesterdayEpoch);

  console.log(dateToYMD(yearAgoDate));
  console.log(dateToYMD(yesterdayDate));

  // Open
  googleFinance.historical({
    symbol: ['NASDAQ:FB', 'NASDAQ:GOOGL'],
    from: dateToYMD(yearAgoDate),
    to: dateToYMD(yesterdayDate)
  }, function (err, quotes) {
    res.send(quotes);
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
console.log("App created at http://localhost:5000/");