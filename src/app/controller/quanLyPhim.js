const connection = require("../../config/connection");
const express = require("express");
const upload = require("../../middleware/uploadService");
const fs = require('fs');
const path = require('path');

let dsTheLoai = [];
const defaultImg= path.join(__dirname,'../../resources/upload/cinema_logo_4x.png');

  
class quanLyPhim {
  async getListPhim(req, res) {
    const hoTenND=req.session.user[0].hoTen;
    const anhND=req.session.user[0].anh;

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
        anhND:anhND,
        notificationErr,
        notificationSuccess
      });
    });
  }
  // GET[]/phim/phimdachieu
  async getListPhimDC(req, res) {
    const hoTenND=req.session.user[0].hoTen;
    const anhND=req.session.user[0].anh;
  

    const querry = `SELECT C.ngayChieu, t.*, l.tenTheLoai from Phim t JOIN  theloai l ON t.idTheLoai= l.idTheLoai JOIN lichchieu c ON t.idPhim= c.idPhim WHERE c.ngayChieu < CURRENT_DATE ORDER BY c.ngayChieu DESC`;
    connection.query(querry, (err, results) => {
      if (err) {
        console.error("Lỗi", err.message);
        return;
      }
      res.render("movies/phimDaChieu", {
        title: "Phim đã chiếu",
        listDaChieu: results,
        hoTenND:hoTenND,
        anhND:anhND,
        
      });
    });
  }
  // GET[]/phim/phimdachieu/:idPhim
  async getChiTietPhimDaChieu(req, res) {
    const idPhim = req.params.idPhim;
    const hoTenND=req.session.user[0].hoTen;
    const anhND=req.session.user[0].anh;

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
  async getAddNewPhim(req, res) {
    const hoTenND=req.session.user[0].hoTen;
    const anhND=req.session.user[0].anh;

    const queryTheLoai = "SELECT * FROM TheLoai WHERE hienThi = 1";

    connection.query(queryTheLoai, (err, result) => {
      dsTheLoai = result;
      res.render("movies/themphim", { 
        title:'Thêm phim mới',
        listTheLoai: dsTheLoai,
        hoTenND:hoTenND,
        anhND:anhND,
      });
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


  // POST[]/quanlyphim/phim/them/luu
async addNewPhim(req, res) {
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
      const ngayThem=new Date()
      
      var anhStringBase64;

      if (req.file) {
        var anh = fs.readFileSync(req.file.path);
        anhStringBase64 = anh.toString("base64");
      } else {
        var anhDefault=fs.readFileSync(defaultImg)
        anhStringBase64 =anhDefault.toString("base64"); 
      }  
      connection.query(
        "INSERT INTO Phim (tenPhim, anh, ngonNgu, moTa, hangSX, nuocSX, namSX, thoiLuong, daoDien, hienThi, trangThai, idTheLoai,ngayThem) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          tenPhim,
          anhStringBase64,
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
          ngayThem
        ],
        (err, results) => {
          if (err) {
            console.log(err.message);
            req.flash("notificationErr", "Lỗi khi thêm phim: " + err.message);
            res.redirect("/quanlyphim/phim");
          } else {
            req.flash("notificationSuccess", "Thêm phim mới thành công");
            res.redirect("/quanlyphim/phim");
          }
        }
      );
    }
  });
}

//   PUT[]/phim/xoa/idPhim
  async deletePhim(req, res) {
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
async getUpdatePhim(req, res) {
  const idPhim = req.params.idPhim;
  const hoTenND=req.session.user[0].hoTen;
  const anhND=req.session.user[0].anh;
  const queryPhim = "SELECT p.*, t.tenTheLoai FROM Phim p JOIN TheLoai t ON p.idTheLoai=t.idTheLoai WHERE p.idPhim = ? AND p.hienThi = 1";

  connection.query(queryPhim,[idPhim],(err,results)=>{
    res.render("movies/suaPhim", {
      title: 'Cập nhật phim',
      listPhim: JSON.parse(JSON.stringify(results)),
      hoTenND: hoTenND,
      anhND:anhND,
    });
  })

}

// PUT/phim/capnhat/:idPhim
async updatePhim(req, res) {
  upload.single("anh")(req, res, async function (err) {
    if (err) {
      console.error('Lỗi', err);
      req.flash("notificationErr", "Lỗi");
      res.redirect('/quanlyphim/phim');
      return;
    }

    const idPhim = req.params.idPhim; 
    const ngonNgu = req.body.ngonNgu;
    const moTa = req.body.moTa;
    const hangSX = req.body.hangSX;
    const nuocSX = req.body.nuocSX;
    const namSX = req.body.namSX;
    const thoiLuong = req.body.thoiLuong;
    const daoDien = req.body.daoDien;
    let anhStringBase64 = null;

    if (req.file) {
      var anh = fs.readFileSync(req.file.path);
      anhStringBase64 = anh.toString("base64");
    }

    let updateQuery;
    let updateValues;

    if (anhStringBase64) {
      updateQuery = `UPDATE Phim SET ngonNgu=?, moTa=?, daoDien=?, hangSX=?, thoiLuong=?, nuocSX=?, anh=? WHERE idPhim=?`;
      updateValues = [ngonNgu, moTa, daoDien, hangSX, thoiLuong, nuocSX, anhStringBase64, idPhim];
    } else {
      updateQuery = `UPDATE Phim SET ngonNgu=?, moTa=?, daoDien=?, hangSX=?, thoiLuong=?, nuocSX=? WHERE idPhim=?`;
      updateValues = [ngonNgu, moTa, daoDien, hangSX, thoiLuong, nuocSX, idPhim];
    }

    connection.query(updateQuery, updateValues, (err, results) => {
      if (err) {
        console.error('Lỗi', err);
        req.flash("notificationErr", "Lỗi");
        res.redirect('/quanlyphim/phim');
      } else {
        req.flash("notificationSuccess", "Cập nhật phim thành công");
        res.redirect('/quanlyphim/phim');
      }
    });
  });
}


}
module.exports = new quanLyPhim();
