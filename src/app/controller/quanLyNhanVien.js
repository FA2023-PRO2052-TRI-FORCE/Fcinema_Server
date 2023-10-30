const connection = require("../../config/connection");
const express = require("express");

const upload = require("../../utils/uploadService");

class qlNhanVien {
  // GET[]/nhanvien
  async goToScreen(req, res) {
    const querry = `SELECT * FROM NhanVien WHERE hienThi=1 AND vaiTro!= 'admin'`;
    connection.query(querry, (err, result) => {
      if (err) {
        console.error("Lỗi", err.message);
        return;
      }
      const notificationSuccess = req.flash("notificationSuccess");
      const notificationErr = req.flash("notificationErr");
      res.render("employees/nhanvien", {
        listNhanVien: result,
        title: "Nhân Viên",
        notificationErr,
        notificationSuccess,
      });
    });
  }
  async add(req, res) {
    res.render("employees/themNhanVien");
  }

  async addEmployee(req, res) {
    upload.single("anh")(req, res, async function (err) {
      if (err) {
        // Xử lý lỗi tải lên hình ảnh ở đây
        console.error(err);
      } else {
        const idNhanVien = req.body.idNhanVien;
        const hoTen = req.body.hoTen;
        const matKhau = req.body.matKhau;
        const email = req.body.email;
        const dienThoai = req.body.dienThoai;
        const gioiTinh = req.body.gioiTinh;
        const ngaySinh = req.body.ngaySinh;
        const diaChi = req.body.diaChi;
        const vaiTro = "Nhân viên";
        const hienThi = 1;

        // Lấy đường dẫn hình ảnh đã tải lên từ req.file.path và sử dụng nó trong truy vấn SQL
        const anh = req.file ? req.file.filename : null; // Đây là đường dẫn tạm thời đến hình ảnh đã tải lên

        connection.query(
          "INSERT INTO NhanVien (idNhanVien, hoTen, matKhau, email, dienThoai, vaiTro, ngaySinh, diaChi, gioiTinh, hienThi, anh) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            idNhanVien,
            hoTen,
            matKhau,
            email,
            dienThoai,
            vaiTro,
            ngaySinh,
            diaChi,
            gioiTinh,
            hienThi,
            anh, // Đường dẫn tới hình ảnh
          ],
          (err, results) => {
            if (err) {
              req.flash(
                "notificationErr",
                "Lỗi khi thêm nhân viên: " + err.message
              );
              res.redirect("/nhanvien");
            } else {
              req.flash("notificationSuccess", "Thêm nhân viên thành công");
              res.redirect("/nhanvien");
            }
          }
        );
      }
    });
  }

  async deleteEmployee(req, res) {
    const idNhanVien = req.params.idNhanVien;
    const updateQuerry = "UPDATE NhanVien SET hienThi=0 WHERE idNhanVien=?";
    connection.query(updateQuerry, [idNhanVien], (err, results) => {
      if (err) {
        // Xử lý lỗi nếu có
        console.error(err);
        req.flash(
          "notificationErr",
          "Lỗi khi xóa nhân viên: " + err.message
        );
      } else {
        // Xóa thành công
        console.log(results);
        req.flash("notificationSuccess", "Xóa nhân viên thành công");
        res.redirect("/nhanvien"); // Hoặc thực hiện bất kỳ hành động nào sau khi xóa
      }
    });
  }


  async getUpdateEmployee(req, res) {
    const idNhanVien = req.params.id;
    const selectEmployeeQuery = "SELECT * FROM NhanVien WHERE idNhanVien = ?";

    connection.query(selectEmployeeQuery, [idNhanVien], (err, results) => {
      if (err) {
        // Xử lý lỗi
        console.error(err);
        req.flash("notificationErr", "Lỗi khi lấy thông tin nhân viên");
      } else {
        if (results.length > 0) {
          res.render("employees/suaNhanVien", {
            listNhanVien: JSON.parse(JSON.stringify(results)),
          });
        } else {
          req.flash("notificationErr", "Không tìm thấy nhân viên");
          res.redirect("/nhanvien");
        }
      }
    });
  }

  async updateEmployee(req, res) {
    upload.single('anh')(req, res, function(err) {
      if (err) {
        console.log(err);
      }else {
        const idNhanVien = req.params.id;
        const hoTen = req.body.hoTen;
        const gioiTinh = req.body.gioiTinh;
        const ngaySinh = req.body.ngaySinh;
        const diaChi = req.body.diaChi;
        const anh = req.file ? req.file.filename : null;
        const updateEmployeeQuery = `UPDATE NhanVien SET hoTen = ?, gioiTinh = ?, ngaySinh = ?, diaChi = ?, anh = ? WHERE idNhanVien = ?`;

        connection.query(
          updateEmployeeQuery,
          [hoTen, gioiTinh, ngaySinh, diaChi, anh, idNhanVien],
          (err, results) => {
            if (err) {
              console.error(err);
              req.flash("notificationErr", "Lỗi cập nhật ");
            } else {
              req.flash("notificationSuccess", "Cập nhật thành công");
              console.log("Sửa thành công");
              res.redirect("/nhanvien");
            }
          }
        );
      }
    });
  }
}
module.exports = new qlNhanVien();
