const express = require('express');
const loaiPhim=require('./routeQuanLyLoaiPhim');
const thongKe=require('./routeThongKe');
const phim = require("./routeQuanLyPhim");
const thongtin = require("./routeQLTK");
const thongBao=require('./routeThongBao');
const khachHang = require('./routeKhachHang');
const nhanVien = require('./routeNhanVien');
const phongChieu = require('./routeQuanLyPhongChieu');
const lichChieu=require('./routeQuanLyLichChieu');
const routeApp=require('./routeAPP');
const doAn=require('./routeDoAn');
const veDat=require('./routeQuanLyVeDat');
const baner=require('./routeBaner');

function route(app) {
  app.use('/', phim);
  app.use('/',loaiPhim);
  app.use('/',thongKe);
  app.use("/",thongtin);
  app.use('/',thongBao);
  app.use('/',khachHang);
  app.use('/',nhanVien);
  app.use('/',phongChieu)
  app.use('/',lichChieu)
  app.use('/',routeApp);
  app.use('/',doAn);
  app.use('/',veDat);
  app.use('/',baner);
}

module.exports = route;