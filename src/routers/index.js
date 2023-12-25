const genre=require('./routeGenre');
const statistic=require('./routeStatistic');
const movie = require("./routeMovie");
const account = require("./routeAccount");
const notify=require('./routeNotify');
const user = require('./routeUser');
const emp = require('./routeEmployee');
const room = require('./routeRoom');
const showtime=require('./routeShowtime');
const routeApp=require('./routeAPP');
const popcorn=require('./routePopcorn');
const ticket=require('./routeTicket');
const baner=require('./routeBaner');

function route(app) {
  app.use('/', movie);
  app.use('/',genre);
  app.use('/',statistic);
  app.use("/",account);
  app.use('/',notify);
  app.use('/',user);
  app.use('/',emp);
  app.use('/',room)
  app.use('/',showtime)
  app.use('/',routeApp);
  app.use('/',popcorn);
  app.use('/',ticket);
  app.use('/',baner);
}

module.exports = route;