const connection = require("../../config/connection");
const express = require("express");
const upload = require("../../utils/uploadService");
const fs = require('fs');
const path = require('path');

let dsTheLoai = [];
const defaultImg= path.join(__dirname,'../../resources/upload/cinema_logo_4x.png');

  
class quanLyPhim {
  async getdsPhim(req, res) {
    const hoTenND=req.session.user[0].hoTen;
    const querry = `SELECT p.*, t.tenTheLoai FROM Phim p
    INNER JOIN TheLoai t ON p.idTheLoai = t.idTheLoai
    WHERE p.hienThi = 1 and p.trangThai=1;`;

    connection.query(querry, async(err, result) => {
      // kiểm tra truy vấn nếu có lỗi thì sẽ log lỗi ra và return không thực hiện các câu lệnh dưới
      if (err) {
        console.error("Lỗi", err.message);
        return;
      }
      const notificationSuccess = req.flash('notificationSuccess');
      const notificationErr = req.flash('notificationErr');      
      
      res.render("movies/phim", {
        title:'Danh sách phim mới',
        listPhim: result,
        hoTenND:hoTenND,
        notificationErr,
        notificationSuccess
      });
    });
  }
  // GET[]/phim/phimdachieu
  async getdsPhimDaChieu(req, res) {
    const hoTenND=req.session.user[0].hoTen;
    const querry = `SELECT t.*, l.tenTheLoai from Phim t, theloai l WHERE t.idTheLoai=l.idTheLoai and trangThai=2`;
    connection.query(querry, (err, results) => {
      if (err) {
        console.error("Lỗi", err.message);
        return;
      }
      res.render("movies/phimDaChieu", {
        title: "Phim đã chiếu",
        listDaChieu: results,
        hoTenND:hoTenND,
        
      });
    });
  }
  // GET[]/phim/phimdachieu/:idPhim
  async chiTietPhimDaChieu(req, res) {
    const idPhim = req.params.idPhim;
    const hoTenND=req.session.user[0].hoTen;
    const querry = `SELECT l.tenTheLoai, p.* from Phim p, TheLoai l where p.idTheLoai=l.idTheLoai and trangThai=2 and idPhim=?`;
    connection.query(querry, [idPhim], (err, results) => {
      if (err) {
        console.error("Lỗi", err.message);
        return;
      }
      res.send(results);
    });
  }
  // PUT[]/quanlyphim/phimdachieu/:idPhim
  async xoaPhimDaChieu(req, res) {
    const idPhim = req.params.idPhim;
    const updateQuerry = `UPDATE PHIM SET hienThi=0 WHERE idPhim=?`;
    connection.query(updateQuerry, [idPhim], (err, results) => {
      if (err) {
        console.error("Lỗi", err.message);
        req.flash("notificationErr", "Xóa phim thất bại");
        res.redirect('/quanlyphim/phimdachieu');        
        return;
      }
      req.flash("notificationSuccess", "Xóa phim thành công");
      res.redirect('/quanlyphim/phimdachieu');

    });
  }


  // GET/phim/them
  async getThemPhim(req, res) {
    const hoTenND=req.session.user[0].hoTen;
    const queryTheLoai = "SELECT * FROM TheLoai WHERE hienThi = 1";

    connection.query(queryTheLoai, (err, result) => {
      dsTheLoai = result;
      res.render("movies/themphim", { 
        title:'Thêm phim mới',
        listTheLoai: dsTheLoai,
        hoTenND:hoTenND });
    });
  }

//   GET[]/dsTheloai
  async getDanhSachTheLoai(req, res) {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM TheLoai", (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }


async themPhim(req, res) {
  upload.single("anh")(req, res, async function (err) {
    if (err) {
      // Xử lý lỗi tải lên hình ảnh ở đây
      console.error("Lỗi khi thêm ảnh: " + err);
    } else {
      const tenPhim = req.body.tenPhim;
      const ngonNgu = req.body.ngonNgu;
      const moTa = req.body.moTa;
      const hangSX = req.body.hangSX;
      const nuocSX = req.body.nuocSX;
      const namSX = req.body.namSX;
      const thoiLuong = req.body.thoiLuong;
      const daoDien = req.body.daoDien;
      const idTheLoai = req.body.idTheLoai;
      const trangThai = 1;
      const hienThi = 1;
      
      // Lấy đường dẫn hình ảnh từ req.file.filename hoặc sử dụng ảnh mặc định
      const anh = req.file?.filename;

      connection.query(
        "INSERT INTO Phim (tenPhim, anh, ngonNgu, moTa, hangSX, nuocSX, namSX, thoiLuong, daoDien, hienThi, trangThai, idTheLoai) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          tenPhim,
          anh,
          ngonNgu,
          moTa,
          hangSX,
          nuocSX,
          namSX,
          thoiLuong,
          daoDien,
          hienThi,
          trangThai,
          idTheLoai,
        ],
        (err, results) => {
          if (err) {
            console.log(err.message);
            req.flash("notificationErr", "Lỗi khi thêm phim: " + err.message);
            res.redirect("/quanlyphim/phim");
          } else {
            console.log(results);
            req.flash("notificationSuccess", "Thêm phim mới thành công");
            res.redirect("/quanlyphim/phim");
          }
        }
      );
    }
  });
}

//   PUT[]/phim/xoa/idPhim
  async xoaPhim(req, res) {
    const idPhim = req.params.idPhim;

    connection.query(
      "UPDATE Phim SET hienThi = 0 WHERE idPhim = ?",
      [idPhim],
      (err, result) => {
        if (err) {
          req.flash("notificationErr", "Xóa phim thất bại: ");
        } else {
          req.flash("notificationSuccess", "Xóa phim thành công");
        }
        res.redirect("/quanlyphim/phim");
      }
    );
  }

// GET/phim/capnhat/:idPhim
async getCapNhatPhim(req, res) {
  const idPhim = req.params.idPhim;
  const hoTenND = req.session.user[0].hoTen;

  const queryTheLoai = "SELECT * FROM TheLoai WHERE hienThi = 1";
  const queryPhim = "SELECT * FROM Phim WHERE idPhim = ? AND hienThi = 1";

  connection.query(queryTheLoai, (errTheLoai, resultTheLoai) => {
    if (errTheLoai) {
      console.error(errTheLoai);
      req.flash("notificationErr", "Lỗi khi lấy danh sách thể loại");
    } else {
      const dsTheLoaiUp = resultTheLoai;

      connection.query(queryPhim, [idPhim], (errPhim, resultPhim) => {
        if (errPhim) {
          console.error(errPhim);
          req.flash("notificationErr", "Lỗi khi lấy thông tin phim");
        } else {
          if (resultPhim.length > 0) {
            console.log(resultPhim);
            console.log(dsTheLoaiUp)
            // Trả về trang cập nhật với thông tin phim và danh sách thể loại
            res.render("movies/suaPhim", {
              title: 'Cập nhật phim',
              listPhim: JSON.parse(JSON.stringify(resultPhim)),
              listTheLoaiUp: dsTheLoaiUp,
              hoTenND: hoTenND
            });
          } else {
            req.flash("notificationErr", "Không tìm thấy phim");
            res.redirect("/quanlyphim/phim");
          }
        }
      });
    }
  });
}

}
module.exports = new quanLyPhim();
