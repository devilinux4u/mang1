const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const scraping = require('./scraping');

app.get('/', (req, res) => {
    res.send('its working ');
});


app.get('/scrape', (req, res) => {
    scraping(res);
});


app.listen(port, () => {
    console.log(`API served in port ${port}`);
});