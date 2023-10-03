const phim = require("./routeQuanLyPhim");
const thongtin = require("./routeQLTK")
const express = require("express");

function route(app) {
  app.use("/", phim);
  app.use("/",thongtin)
}

module.exports = route;