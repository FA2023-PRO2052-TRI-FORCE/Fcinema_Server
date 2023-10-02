const phim = require("./routeQuanLyPhim");
const express = require("express");

function route(app) {
  app.use("/", phim);
}

module.exports = route;