const express = require('express');
const loaiPhim=require('./routeQuanLyLoaiPhim');
const thongKe=require('./routeThongKe');
const phim = require("./routeQuanLyPhim");
const thongtin = require("./routeQLTK");
const thongBao=require('./routeThongBao');
const khachHang = require('./routeKhachHang')
const phongChieu = require('./routeQuanLyPhongChieu');
const lichChieu=require('./routeQuanLyLichChieu');

const veDat=require('./routeQuanLyVeDat');

function route(app) {
  app.use('/', phim);
  app.use('/',loaiPhim);
  app.use('/',thongKe);
  app.use("/",thongtin);
  app.use('/',thongBao);
  app.use('/',khachHang)
  app.use('/',phongChieu)
  app.use('/',lichChieu)

  app.use('/',veDat)
}

module.exports = route;