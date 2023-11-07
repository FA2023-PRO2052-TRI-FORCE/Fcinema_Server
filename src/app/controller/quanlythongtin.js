const e = require("express");
const connection = require("../../config/connection");

const upload = require("../../middleware/uploadService");
const fs = require("fs");
const path = require("path");

class quanlythongtin {
  // GET[]/taikhoan
  async gotoAccount(req, res) {
    const hoTenND = req.session.user[0].hoTen;
    const anhND = req.session.user[0].anh;

    const idNhanVien = req.session.user[0].idNhanVien;
    const querry = `SELECT * FROM NhanVien WHERE idNhanVien=?`;
    connection.query(querry, [idNhanVien], (err, results) => {
      const notificationSuccess = req.flash("notificationSuccess");
      const notificationErr = req.flash("notificationErr");
      const objNV = JSON.parse(JSON.stringify(results));
      console.log("type of", typeof objNV.ngaySinh);
      res.render("account/myAccount", {
        title: "Thông tin tài khoản",
        hoTenND: hoTenND,
        anhND: anhND,
        objNhanVien: objNV,
        notificationSuccess: notificationSuccess,
        notificationErr: notificationErr,
      });
    });
  }

  // POST[]/login
  async loginAccount(req, res) {
    const idNhanVien = req.body.idNhanVien;
    const matKhau = req.body.matKhau;
    let message = [];

    const querry = `SELECT *  FROM NhanVien WHERE idNhanVien=? and hienThi=1`;
    const values = [idNhanVien, matKhau];
    connection.query(querry, values, (err, results) => {
      if (err) {
        console.error("Lỗi", err.message);
        return;
      }
      if (results.length == 0) {
        message.push({ err: "Người dùng không tồn tại" });
        res.render("account/login", {
          layout: "login",
          message: message,
          idNhanVien: req.body.idNhanVien,
          matKhau: req.body.matKhau,
        });
      } else {
        const storedPassword = results[0].matKhau;
        if (matKhau !== storedPassword) {
          message.push({ err: "Mật khẩu không đúng" });
          res.render("account/login", {
            layout: "login",
            message: message,
            idNhanVien: req.body.idNhanVien,
            matKhau: req.body.matKhau,
          });
        } else {
          const objectNV = JSON.parse(JSON.stringify(results));
          req.session.user = objectNV;
          req.flash("notificationSuccess", "Đăng nhập thành công");
          res.redirect("/tongquan");
        }
      }
    });
  }
  // GET[]/logout
  async logoutAccount(req, res) {
    if (req.session.user) {
      req.session.destroy();
    }
    res.redirect("/login");
  }
  // GET[]/login
  async gotoLogin(req, res) {
    const updateVeQuerry = `UPDATE VE v INNER JOIN lichchieu l ON v.idLichChieu = l.idLichChieu SET v.trangThai=2 WHERE l.ngayChieu < CURRENT_DATE`;
    connection.query(updateVeQuerry, (err, result) => {
      if (err) {
        console.log("Lỗi", err.message);
      }
      res.render("account/login", { layout: "login" });
    });
  }
  // GET[]/changepass
  async goToChangePass(req, res) {
    const matKhau = req.session.user[0].matKhau;
    const idNhanVien = req.session.user[0].idNhanVien;
    const hoTenND = req.session.user[0].hoTen;
    const anhND = req.session.user[0].anh;

    const notificationSuccess = req.flash("notificationSuccess");
    const notificationErr = req.flash("notificationErr");
    res.render("account/changePass", {
      title: "Thay đổi mật khẩu",
      hoTenND: hoTenND,
      anhND: anhND,
      matKhau: matKhau,
      idNhanVien: idNhanVien,
      notificationErr,
      notificationSuccess,
    });
  }
  // PUT[]/changepass
  async changePasswordUser(req, res) {
    const idNhanVien = req.session.user[0].idNhanVien;
    const oldMatKhau = req.session.user[0].matKhau;
    const matKhau = req.body.matKhau;
    const newMatKhau = req.body.newMatKhau;
    const comfirmMatKhau = req.body.comfirmMatKhau;
    const updateQuerry = `UPDATE NhanVien SET matKhau=? WHERE idNhanVien=?`;
    connection.query(updateQuerry, [newMatKhau, idNhanVien], (err, results) => {
      if (err) {
        req.flash("notificationErr", "Không tìm thấy phim");
        res.redirect("/changePass");
        return;
      }
      if (matKhau != oldMatKhau) {
        req.flash("notificationErr", "Mật khẩu cũ không đúng");
        res.redirect("/changePass");
        return;
      }
      if (newMatKhau != comfirmMatKhau) {
        req.flash("notificationErr", "Xác nhận mật khẩu mới không trùng");
        res.redirect("/changePass");
        return;
      } else {
        req.flash("notificationSuccess", "Thay đổi mật khẩu thành công");
        res.redirect("/changePass");
      }
    });
  }

  // GET[]/tongquan
  async getTongQuan(req, res) {
    const notificationSuccess = req.flash("notificationSuccess");
    const notificationErr = req.flash("notificationErr");
    const hoTenND = req.session.user[0].hoTen;
    const anhND = req.session.user[0].anh;

    const querry = `UPDATE LichChieu SET hienThi=0  WHERE ngayChieu<= CURRENT_DATE `;
    connection.query(querry, (err, results) => {
      if (err) {
        console.error("Lỗi", err.message);
        return;
      }
      const querryP = `UPDATE Phim SET trangThai=0 WHERE idPhim IN(SELECT l.idPhim FROM LichChieu l WHERE l.ngayChieu<=CURRENT_DATE)`;
      connection.query(querryP, (err, result) => {
        if (err) {
          console.error("Lỗi", err.message);
          return;
        }
        res.render("account/dasboard", {
          title: "Tổng Quan",
          hoTenND: hoTenND,
          anhND: anhND,
          notificationSuccess,
          notificationErr,
        });
      });
    });
  }

  // PUT[]/updateProfile
  async updateProfile(req, res) {
    upload.single("anh")(req, res, async function (err) {
      if (err) {
        console.error(err);
      } else {
        const idNhanVien = req.session.user[0].idNhanVien;
        const hoTen = req.body.hoTen;
        const dienThoai = req.body.dienThoai;
        const email = req.body.email;
        const ngaySinh = req.body.ngaySinh;
        const diaChi = req.body.diaChi;
        const gioiTinh = req.body.gioiTinh;
        const vaiTro = req.session.user[0].vaiTro;
        var anhStringBase64;
        var emailRegex = /^\S+@\S+\.\S+$/;
        var dienThoaiRegex = /^(\+84|0)[1-9]\d{8}$/;

        if (!emailRegex.test(email)) {
          req.flash("notificationErr", "Email định dạng không đúng");
          return res.redirect("/myAccount");
        }

        if (!dienThoaiRegex.test(dienThoai)) {
          req.flash("notificationErr", "Điện thoại định dạng không đúng");
          return res.redirect("/myAccount");
        }

        let query;
        let params;

        if (req.file) {
          var anh = fs.readFileSync(req.file.path);
          anhStringBase64 = anh.toString("base64");
          query = `
                UPDATE NhanVien SET hoTen = ?, dienThoai = ?, email= ?, anh = ?, ngaySinh = ?, diaChi = ?, gioiTinh = ? WHERE idNhanVien = ? `;
          params = [
            hoTen,
            dienThoai,
            email,
            anhStringBase64,
            new Date(ngaySinh),
            diaChi,
            gioiTinh,
            idNhanVien,
          ];
          req.session.user[0].anh = anhStringBase64;
        } else {
          query = `
                UPDATE NhanVien SET hoTen = ?, dienThoai = ?, email= ?, ngaySinh = ?, diaChi = ?, gioiTinh = ? WHERE idNhanVien = ? `;
          params = [
            hoTen,
            dienThoai,
            email,
            new Date(ngaySinh),
            diaChi,
            gioiTinh,
            idNhanVien,
          ];
        }
        connection.query(query, params, (err, result) => {
          if (err) {
            console.error("Lỗi", err.message);
            req.flash("notificationErr", "Lỗi");
            res.redirect("/myAccount");
            return;
          }

          req.session.user[0].hoTen = hoTen;
          req.session.user[0].dienThoai = dienThoai;
          req.session.user[0].email = email;
          req.session.user[0].ngaySinh = ngaySinh;
          req.session.user[0].diaChi = diaChi;
          req.session.user[0].gioiTinh = gioiTinh;
          req.flash("notificationSuccess", "Thay đổi thông tin thành công");
          res.redirect("/myAccount");
        });
      }
    });
  }
}

module.exports = new quanlythongtin();
