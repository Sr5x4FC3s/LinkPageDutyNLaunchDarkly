const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const PORT = 8080;


const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '../dist')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve('dist', 'index.html'));
});

app.listen(PORT, () => console.log(`dev-port ${PORT} is active.}`));