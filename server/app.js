var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
mongoose.connect('mongodb+srv://userdb:123123123@cluster0.age2x.mongodb.net/<dbname>?retryWrites=true&w=majority',
{
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
}, function(error) {
  if (error) {
    console.log(error);
  } else {
    console.log('Connection opened to mongodb !!');
  }
}
);

app.get('/', (req, res) => {
  res.sendFile(path.join(_dirname, '../public/index.html'));
})

module.exports = app;
