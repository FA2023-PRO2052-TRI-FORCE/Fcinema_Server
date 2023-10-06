const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
const moment = require('moment');

const app = express();
const port = 3000;

const route=require('./src/routers/index');


app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, 'src', 'resources')));

// http logger
app.use(morgan('combined'));

app.engine(
  'hbs',
  handlebars.engine({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: __dirname + '\\src\\views\\layouts\\',
    partialsDir: __dirname + '\\src\\views\\',
    helpers: {
      sum: (a, b) => a + b,
      formatDate:(date) => moment(date).format('MM/DD/YYYY'),
    },
  })
);


app.set('view engine', 'hbs');
app.set('views', __dirname + '\\src\\views\\');


route(app);

app.listen(port, () => {
  console.log('port: ' + port);
  console.log("PATH:" + __dirname + "\\src\\views");


});
