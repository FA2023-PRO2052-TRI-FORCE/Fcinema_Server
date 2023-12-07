const LichChieuModel = require('../model/lichChieuModel');
const VeModel = require('../model/veModel');
const ViTriGheModel = require('../model/viTriGheModel');
const ChiTietSanPhamModel = require('../model/chiTietSanPhamModel');
const sanPhamModel = require('../model/sanPhamModel');

class qlVeDat {
  // GET[]/ve/dsve
  async getAllVeDaDat(req, res) {
    const hoTenND = req.session.user[0].hoTen;
    const anhND = req.session.user[0].anh;
    const notificationSuccess = req.flash('notificationSuccess');
    const notificationErr = req.flash('notificationErr');

    const veModel = new VeModel();

    try {
      const result = await veModel.getAllVeDaDat();

      res.render('tickets/veDat', {
        title: 'Vé đã đặt',
        hoTenND: hoTenND,
        anhND: anhND,
        listVe: result,
        notificationSuccess,
        notificationErr,
      });
    } catch (err) {
      console.error('Lỗi', err.message);
      req.flash("notificationErr", "Lỗi");
      return res.redirect("/ve/them");
    }
  }
  // GET[]/ve/themve
  async getNewVe(req, res) {
    const hoTenND = req.session.user[0].hoTen;
    const anhND = req.session.user[0].anh;
    const notificationSuccess = req.flash('notificationSuccess');
    const notificationErr = req.flash('notificationErr');

    const lichChieuModel = new LichChieuModel();
    const SanPhamModel = new sanPhamModel();

    try {
      const [listLC, listDoAn] = await Promise.all([
        lichChieuModel.getAllLichChieu(),
        SanPhamModel.getAllSanPhamMeasureStockQuantity(),
      ]);

      res.render('tickets/themVeMoi', {
        title: 'Thêm vé mới',
        hoTenND: hoTenND,
        anhND: anhND,
        listLC: listLC,
        listDoAn: listDoAn,
        notificationSuccess,
        notificationErr,
      });
    } catch (err) {
      console.error('Lỗi', err.message);
      req.flash("notificationErr", "Lỗi");
      return res.redirect("/ve/them");
    }
  }
  // POST[]/ve/them/luu
  async insertNewVe(req, res) {
    const veModel = new VeModel();
    const viTriGheModel = new ViTriGheModel();
    const SanPhamModel = new sanPhamModel();
    const chiTietSanPhamModel = new ChiTietSanPhamModel();
    const idVe = req.body.idVe;
    const idLichChieu = req.body.idLichChieu;
    const tongTien = req.body.tongTien;
    const tenGhe = req.body.tenGhe;
    const trangThai = 0;
    const phuongThucTT = req.body.phuongThucTT;
    const ngayMua = new Date;
    const arrayOfTenGhe = tenGhe.split(', ');
    const soVe = arrayOfTenGhe.length;
    const idPhongChieu = req.body.idPhongChieu;
    const idNhanVien = req.session.user[0].idNhanVien;
    const idDoAn = req.body.idDoAn;
    const soLuongChon = req.body.soLuong;
    const coSan = req.body.coSan;
    const insertCTDAValues = [];
    const insertVeValues = [idVe, soVe, ngayMua, tongTien, trangThai, phuongThucTT, null, idNhanVien, idLichChieu]
    const insertVTGValues = [JSON.stringify(tenGhe), 1, idPhongChieu, idVe];
    let updateDAValues = [];


    for (let i = 0; i < soLuongChon.length; i++) {
      const soLuong = Array.from(soLuongChon[i]);

      if (soLuong[0] && soLuong.some(value => parseInt(value) > 0)) {
        const soLuongChonValue = parseInt(soLuong[0]);
        const idDoAnValue = Number(idDoAn[i]);

        if (coSan[i] && parseInt(coSan[i]) > 0) {
          const coSanValue = parseInt(coSan[i]);
          const newCoSan = coSanValue - soLuongChonValue;

          const resultArrayDA = [newCoSan, idDoAnValue];
          updateDAValues.push(resultArrayDA);
        }

        const resultArray = [
          JSON.parse(soLuong[0]),
          idDoAnValue,
          idVe
        ];
        insertCTDAValues.push(resultArray);
      }
    }

    if (idPhongChieu == null || idPhongChieu === "") {
      req.flash("notificationErr", "Chưa chọn phim");
      return res.redirect("/ve/them");
    }

    if (tenGhe == null || tenGhe === "") {
      req.flash("notificationErr", "Chưa chọn ghế");
      return res.redirect("/ve/them");
    }
    console.log('SL', soLuongChon);


    try {
      if ((Array.isArray(soLuongChon) && soLuongChon.every(item => item === '' || item == 0))) {

        await veModel.insertNewVe(insertVeValues);
        await viTriGheModel.insertViTriGhe(insertVTGValues);

        req.flash('notificationSuccess', 'Thêm vé thành công');
        res.redirect('/ve')
      } else {
        await veModel.insertNewVe(insertVeValues);
        await viTriGheModel.insertViTriGhe(insertVTGValues);
        await chiTietSanPhamModel.insertChiTietDoAn(insertCTDAValues);
        await SanPhamModel.updateCoSanById(updateDAValues);
        req.flash('notificationSuccess', 'Thêm vé thành công');
        res.redirect('/ve')

      }

    } catch (error) {
      console.error('Lỗi', error)
      req.flash("notificationErr", "Lỗi");
      return res.redirect("/ve/them");
    }




  }
  // GET[]/ve/chitet
  async getChiTietVe(req, res) {
    const hoTenND = req.session.user[0].hoTen;
    const anhND = req.session.user[0].anh;
    const idVe = req.params.idVe;

    const veModel = new VeModel();
    const chiTietSanPhamModel = new ChiTietSanPhamModel();

    try {
      const [veData, listDoAn] = await Promise.all([
        veModel.getVeById(idVe),
        chiTietSanPhamModel.getChiTietDoAnByIdVe(idVe),
      ]);

      res.render('tickets/chiTietVe', {
        title: 'Chi tiết vé đặt',
        hoTenND: hoTenND,
        anhND: anhND,
        objectVe: veData,
        listDoAn: listDoAn,
      });
    } catch (err) {
      console.error('Lỗi', err.message);
      req.flash("notificationErr", "Lỗi");
      return res.redirect("/ve/them");
    }
  }
  // PUT[]ve/chitiet/:idVe
  async updateTrangThaiVe(req, res) {
    const idVe = req.params.idVe;
    const trangThai = req.body.trangThai;

    const veModel = new VeModel();

    try {
      await veModel.updateTrangThaiVe(idVe, trangThai);
      req.flash('notificationSuccess', 'Cập nhật trạng thái thành công');
      res.redirect('back');
    } catch (err) {
      console.error('Lỗi', err.message);
      req.flash('notificationErr', 'Lỗi');
      res.redirect('back');
    }
  }


}
module.exports = new qlVeDat()