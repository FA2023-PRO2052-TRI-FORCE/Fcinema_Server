const connection = require("../../config/connection");
const express = require("express");
const upload = require("../../../src/uploads/uploadService");


let dsTheLoai = [];


  
class quanLyPhim {
  async getdsPhim(req, res) {
    const querry = `SELECT p.*, t.tenTheLoai FROM Phim p
    INNER JOIN TheLoai t ON p.idTheLoai = t.idTheLoai
    WHERE p.hienThi = 1 and p.trangThai=1;
`;
    connection.query(querry, async(err, result) => {
      // kiểm tra truy vấn nếu có lỗi thì sẽ log lỗi ra và return không thực hiện các câu lệnh dưới
      if (err) {
        console.error("Lỗi", err.message);
        return;
      }

      result.forEach((phim) => {
        const bufferData = phim.anh; // Đây là dữ liệu Buffer

        const base64Data = bufferData.toString('base64');
        const imageUrl = `data:image/jpeg;base64,${base64Data}`;
        
        phim.urlAnh = imageUrl;
      });

  
      console.log(result);

      res.render("movies/phim", {
        listPhim: result,
      });
    });
  }
  // GET[]/phim/phimdachieu
  async getdsPhimDaChieu(req, res) {
    const querry = `SELECT t.*, l.tenTheLoai from Phim t, theloai l WHERE t.idTheLoai=l.idTheLoai and trangThai=2`;
    connection.query(querry, (err, results) => {
      if (err) {
        console.error("Lỗi", err.message);
        return;
      }
      res.render("movies/phimDaChieu", {
        title: "Phim đã chiếu",
        listDaChieu: results,
      });
    });
  }
  // GET[]/phim/phimdachieu/:idPhim
  async chiTietPhimDaChieu(req, res) {
    const idPhim = req.params.idPhim;
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
    let notificationErr = [];
    const idPhim = req.params.idPhim;
    const updateQuerry = `UPDATE PHIM SET hienThi=0 WHERE idPhim=?`;
    connection.query(updateQuerry, [idPhim], (err, results) => {
      if (err) {
        console.error("Lỗi", err.message);
        notificationErr.push({ err: err.message });
        return;
      }
      req.flash("notificationSuccess", "Xóa phim thành công");
      res.redirect('/quanlyphim/phimdachieu');

    });
  }


  // GET[]/tongquan
  async tongQuan(req, res) {
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
        res.render("account/dasboard", { title: "Tổng Quan" });
      });
    });
  }
  async getThemPhim(req, res) {
    const queryTheLoai = "SELECT * FROM TheLoai WHERE hienThi = 1";

    connection.query(queryTheLoai, (err, result) => {
      dsTheLoai = result;
      res.render("movies/themphim", { listTheLoai: dsTheLoai });
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

//   POST[]/phim/them/luu
  async themPhim(req, res) {
    upload.single("anh")(req, res, async function (err) {
      if (err) {
        // Xử lý lỗi tải lên hình ảnh ở đây
        console.error(err);
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

        const anh = req.file
          ? req.file.filename
          : "url_cua_hinh_anh_mac_dinh.jpg";

        connection.query(
          "INSERT INTO Phim (tenPhim, anh, ngonNgu, moTa, hangSX, nuocSX, namSX, thoiLuong, daoDien, hienThi, trangThai, idTheLoai) VALUES (? ,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
          req.flash("notificationErr", "Xóa phim thất bại: " + err.message);
        } else {
          req.flash("notificationSuccess", "Xóa phim thành công");
        }
        res.redirect("/quanlyphim/phim");
      }
    );
  }


  async getCapNhatPhim(req, res) {
    const idPhim = req.params.idPhim;

    const query = "SELECT * FROM Phim WHERE idPhim = ? AND hienThi = 1";
    connection.query(query, [idPhim], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Lỗi khi lấy thông tin phim");
      } else {
        if (result.length > 0) {
          console.log(result);
          // Trả về trang cập nhật với thông tin thể loại phim
          res.render("movies/suaPhim", {
            Phim: result[0], // Chỉ lấy thông tin đầu tiên (nếu có)
          });
        } else {
          res.status(404).send("Không tìm thấy thể loại phim");
        }
      }
    });
  }
}
module.exports = new quanLyPhim();
