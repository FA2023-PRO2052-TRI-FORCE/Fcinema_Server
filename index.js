const express = require("express");
const handlebars = require("express-handlebars");
const path = require("path");
const morgan = require("morgan");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
const moment = require("moment");
const paginateHelper = require("express-handlebars-paginate");
const flash = require("express-flash");
const session = require("express-session");

const app = express();
const port = 3000;

const route = require("./src/routers/index");

app.use(methodOverride("_method"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, 'src', 'public')))
app.use(express.static(path.join(__dirname, 'src', 'resources')));

// http logger
app.use(morgan("combined"));

app.use(
  session({
    secret: "get-message",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

app.engine(
  "hbs",
  handlebars.engine({
    defaultLayout: "main",
    extname: ".hbs",
    layoutsDir: __dirname + "\\src\\views\\layouts\\",
    partialsDir: __dirname + "\\src\\views\\",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowedProtoMethodsByDefault: true,
    },
    helpers: {
      sum: (a, b) => a + b,
      formatDate: (date) => moment(date).format("DD/MM/YYYY"),
      paginate: paginateHelper.createPagination,
      formatCurrency: (number, currencyCode) => {
        const formatter = new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: currencyCode,
        });
        return formatter.format(number);
      },
      eq(val1, val2, options) {
        return val1 === val2 ? options.fn(this) : options.inverse(this);
      },
      json: function (context) {
        return JSON.stringify(context);
      },
      object: function (context) {
        return JSON.parse(context);
      },
      convertStatus:function(trangThai) {
        return trangThai === 1 ? 'Đang hoạt động' : 'Không hoạt động';

      },
      bufferToBlob: function (buffer, mimeType) {
        const blob = new Blob([buffer], { type: mimeType });
        return URL.createObjectURL(blob);
      },

      parseDate: function(date) {
        return date.toString().split('T')[0];  
       },
       convertStatusUser:function(trangThai) {
        return trangThai === 1 ? 'Đang hoạt động' : trangThai===0? 'Ngừng hoạt động' :'Chờ xác nhận xoá ';
      },
  
   
      
      },
  })
);

app.set("view engine", "hbs");
app.set("views", __dirname + "\\src\\views\\");

route(app);

app.listen(port, () => {
  console.log("port: " + port);
  console.log("PATH:" + __dirname + "\\src\\views");


});
