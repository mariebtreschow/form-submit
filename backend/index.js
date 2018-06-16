const express = require('express');
const db = require('./models/db');
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const register = require('./controllers/register');
const timeout = require('connect-timeout');
const cors = require('cors');

const { sequelize, Register } = require('./models/db');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(timeout('5s'));
app.use(haltOnTimedout);
app.use(cors());

function haltOnTimedout (req, res, next) {
  if (!req.timedout) next();
}

app.get('/users/:timestamp', (req, res) => {
  register.get(Number(req.params.timestamp)).then((user) => {
    res.send(user);
  });
});

app.post('/users', (req, res) => {
  register.create(req.body).then((user) => {
    res.send(user);
  });
});

app.use((err, req, res, next) => {
  res.status(err.error.status || 500);
  res.json(err);
});

app.use((req, res, next) => {
   res.status(404).json({
     error: {
       status: 404,
       message: 'Ooops, not found!'
     }
   });
});

app.listen(port, () => console.log('Magic is happening on ' + port));
