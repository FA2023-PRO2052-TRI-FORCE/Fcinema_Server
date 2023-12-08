const LichChieuModel = require('../model/lichChieuModel');
const PhimModel = require('../model/phimModel');
const ThongKeModel = require('../model/thongKeModel');
const NhanVienModel = require('../model/nhanVienModel');
const VeModel = require('../model/veModel');
const nhanVien = new NhanVienModel();
const ve = new VeModel();
const upload = require("../../middleware/uploadService");
const cloudinary = require("../../middleware/cloudinary");
const fs = require("fs");
const path = require("path");

class quanlythongtin {
  // GET[]/taikhoan
  async getUserInformationById(req, res) {
    try {
      const hoTenND = req.session.user[0].hoTen;
      const anhND = req.session.user[0].anh;
      const idNhanVien = req.session.user[0].idNhanVien;

      const results = await nhanVien.getNhanVienById(idNhanVien);
      const notificationSuccess = req.flash('notificationSuccess');
      const notificationErr = req.flash('notificationErr');
      const objNV = JSON.parse(JSON.stringify(results));

      res.render('account/myAccount', {
        title: 'Thông tin tài khoản',
        hoTenND,
        anhND,
        idNhanVien,
        objNhanVien: objNV,
        notificationSuccess,
        notificationErr,
      });
    } catch (err) {
      console.error('Error:', err);
      req.flash('notificationErr', 'Lỗi');
      res.redirect('/back');
    }
  }

  // POST[]/login// POST /login
  async loginAccount(req, res) {
    const idNhanVien = req.body.idNhanVien;
    const matKhau = req.body.matKhau;

    try {
      const results = await nhanVien.getUserByIdAndPassword(idNhanVien);

      if (results.length === 0) {
        req.flash('notificationErr', 'Người dùng không tồn tại');
      } else {
        const storedPassword = results[0].matKhau;
        if (matKhau !== storedPassword) {
          req.flash('notificationErr', 'Mật khẩu không đúng');
        } else {
          const objectNV = JSON.parse(JSON.stringify(results));
          req.session.user = objectNV;
          req.flash('notificationSuccess', 'Đăng nhập thành công');
          res.redirect('/tongquan');
          return;
        }
      }
    } catch (err) {
      console.error('Lỗi', err.message);
      req.flash('notificationErr', 'Đã xảy ra lỗi');
      res.redirect('/back');
      return;
    }

    const notificationErr = req.flash('notificationErr').join('<br>');

    res.render('layouts/login', {
      layout: 'login',
      notificationErr,
      idNhanVien: req.body.idNhanVien,
      matKhau: req.body.matKhau,
    });
  }

  // GET[]/logout
  async logoutAccount(req, res) {
    if (req.session.user) {
      req.session.destroy();
    }
    res.redirect('/login')
    }
  // GET[]/login
  async getLoginPage(req, res) {
    try {
      await ve.updateVeExpired();

      res.render('layouts/login', { layout: 'login' });
    } catch (err) {
      console.log('Lỗi', err.message);
      res.redirect('/back');
    }
  }
  // PUT[]/changepass
  async updatePasswordById(req, res) {
    try {
      const idNhanVien = req.session.user[0].idNhanVien;
      const oldMatKhau = req.session.user[0].matKhau;
      
      const matKhau = req.body.matKhau;
      const newMatKhau = req.body.newMatKhau;
      const comfirmMatKhau = req.body.comfirmMatKhau;

      if (matKhau !== oldMatKhau) {
        req.flash('notificationErr', 'Mật khẩu cũ không đúng');
        res.redirect('back');
        return;
      }

      if (newMatKhau !== comfirmMatKhau) {
        req.flash('notificationErr', 'Xác nhận mật khẩu mới không trùng');
        res.redirect('back');
        return;
      }

      await nhanVien.updatePasswordById(idNhanVien, newMatKhau);
      req.session.user[0].matKhau = newMatKhau;

      req.flash('notificationSuccess', 'Thay đổi mật khẩu thành công');
      res.redirect('back');
    } catch (err) {
      console.error('Lỗi', err.message);
      req.flash('notificationErr', 'Lỗi khi thay đổi mật khẩu');
      res.redirect('back');
    }
  }

  // GET[]/tongquan
  async getTongQuan(req, res) {
    const notificationSuccess = req.flash("notificationSuccess");
    const notificationErr = req.flash("notificationErr");
    const hoTenND = req.session.user[0].hoTen;
    const anhND = req.session.user[0].anh;
    const vaiTro = req.session.user[0].vaiTro;
    const idNhanVien = req.session.user[0].idNhanVien;

    const lichChieuModel = new LichChieuModel();
    const phimModel = new PhimModel();
    const thongKeModel = new ThongKeModel();

    try {
      let tongLichChieu, tongVe, tongVeToday, tongSanPham, veOnline, veAtCinema, soVe, date, dates, totalVe, namProduct, quantityOfProduct, totalMoney, totalMoneyMonth, totalVeMonth, totalShowtime;

      await lichChieuModel.updateLichChieuByCurrentDate(),
        await phimModel.updatePhimByNgayChieu(),
        [tongLichChieu, tongVe, tongVeToday, tongSanPham, veOnline, veAtCinema, soVe, date, totalVe, dates, namProduct, quantityOfProduct, totalMoney, totalMoneyMonth, totalVeMonth, totalShowtime] = await Promise.all([

          thongKeModel.getCountAllLichChieu(),
          thongKeModel.getCountAllVeSold(),
          thongKeModel.getCountAllVeSoldToday(),
          thongKeModel.getCountCoSan(),
          thongKeModel.getCountAllVeOnline(),
          thongKeModel.getCountAllVeAtCinema(),
          thongKeModel.getVeStatisticsFor7days(),
          thongKeModel.getDateStatisticsFor7days(),
          thongKeModel.getVeStatisticsFor7days(),
          thongKeModel.getDateStatisticsFor7days(),
          thongKeModel.getNameProduct(),
          thongKeModel.getQuantityProduct(),
          thongKeModel.getToTalRevenueVeStatisticsFor7days(),
          thongKeModel.getStatistics12RevenueMonths(),
          thongKeModel.getStatisticsVe12Months(),
          thongKeModel.getCountAllShowtimesToday()
        ]);

      const extractedquantityOfProduct = quantityOfProduct.map(item => item.tong);
      const extractednamProduct = namProduct.map(item => item.tenDoAn);
      const extractedTotalMoneyMonth = totalMoneyMonth.map(item => item.TongDoanhThu);
      const extractedTotalVeMonth = totalVeMonth.map(item => item.tong);
      const extractedTotalMoneyWeek = totalMoney.map(item => item.tong);


      res.render("account/dasboard", {
        title: "Tổng Quan",
        hoTenND: hoTenND,
        anhND: anhND,
        vaiTro: vaiTro,
        idNhanVien,
        notificationSuccess,
        notificationErr,
        tongLichChieu: tongLichChieu[0].tongLichChieu,
        tongVe: tongVe[0].tongSo,
        totalShowtime: totalShowtime[0].tongSo,
        tongSanPham: tongSanPham[0].tongCoSan,
        veOnline: veOnline[0].tong,
        veAtCinema: veAtCinema[0].tong,
        dates: JSON.parse(JSON.stringify(dates)),
        totalVe: totalVe,
        nameProduct: extractednamProduct,
        quantityOfProduct: extractedquantityOfProduct,
        totalMoney: extractedTotalMoneyWeek,
        totalMoneyMonth: extractedTotalMoneyMonth,
        totalVeMonth: extractedTotalVeMonth

      });
    } catch (error) {
      console.error('Lỗi:', error.message);
      req.flash("notificationErrr", "Lỗi");
      res.redirect("/login");
    }
  }

  // PUT[]/updateInformationUserById
  async updateInformationUserById(req, res) {
    upload.single("anh")(req, res, async function (err) {

      try {
        const idNhanVien = req.session.user[0].idNhanVien;
        const hoTen = req.body.hoTen;
        const dienThoai = req.body.dienThoai;
        const email = req.body.email;
        const ngaySinh = req.body.ngaySinh;
        const diaChi = req.body.diaChi;
        const gioiTinh = req.body.gioiTinh;
        let urlAnh = req.body.originalUrlAnh;

        let anhUpload, publicId;
        const publicIdMatch = urlAnh.match(/\/v\d+\/(.+?)\.\w+$/);

        const emailRegex = /^\S+@\S+\.\S+$/;
        const dienThoaiRegex = /^(\+84|0)[1-9]\d{8}$/;

        if (!emailRegex.test(email) || !dienThoaiRegex.test(dienThoai)) {
          req.flash('notificationErr', 'Email hoặc điện thoại có định dạng không đúng');
          return res.redirect('/myAccount');
        }

        if (req.file) {
          if (publicIdMatch && publicIdMatch[1]) {
            publicId = publicIdMatch[1];
            if (publicId) {
              await cloudinary.uploader.destroy(publicId);
            }
          }

          try {
            const result = await cloudinary.uploader.upload(req.file.path, {
              resource_type: "image",
              folder: "storage/users",
            });
            anhUpload = result.secure_url;
          } catch (cloudinaryError) {
            console.error("Lỗi khi tải ảnh lên Cloudinary:", cloudinaryError);
            req.flash("notificationErr", "Lỗi khi tải ảnh lên Cloudinary");
            res.redirect("/baner");
          }
        }

        await nhanVien.updateInformationUserByID(idNhanVien, hoTen, dienThoai, email, anhUpload, ngaySinh, diaChi, gioiTinh);

        req.session.user[0].hoTen = hoTen;
        req.session.user[0].anh = anhUpload;
        req.session.user[0].dienThoai = dienThoai;
        req.session.user[0].email = email;
        req.session.user[0].ngaySinh = ngaySinh;
        req.session.user[0].diaChi = diaChi;
        req.session.user[0].gioiTinh = gioiTinh;

        req.flash('notificationSuccess', 'Thay đổi thông tin thành công');
        res.redirect('/myAccount');
      } catch (err) {
        console.error('Lỗi', err.message);
        req.flash('notificationErr', 'Lỗi khi thay đổi thông tin');
        res.redirect('/tongquan');
      }
    }
    )
  };
}

module.exports = new quanlythongtin();
