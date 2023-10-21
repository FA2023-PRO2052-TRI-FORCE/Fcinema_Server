const connection = require("../../config/connection");
const express = require("express");

class qlLoaiPhim {
  async dsLoaiPhim(req, res) {
    connection.query("SELECT * FROM TheLoai WHERE hienThi = 1", (err, result) => {
        if (err) {
            console.error("Lỗi", err.message);
            return;
        }
        console.log(result);
        res.render("movies/loaiPhim", {
            listTheLoai: result,
        });
    });
  }
  
  async themLoaiPhim(req, res) {
    const tenTheLoai = req.body.tenTheLoai;
    const hienThi = 1

    connection.query(
      "INSERT INTO TheLoai (tenTheLoai, hienThi) VALUES (?, ?)",
      [tenTheLoai,hienThi],
      (err, result) => {
        if (err) {
          req.flash(
            "notificationErr",
            "Lỗi khi thêm loại phim: " + err.message
          );
          res.redirect("/quanlyphim/loaiphim");
        } else {
          req.flash("notificationSuccess", "Thêm loại phim thành công");
          res.redirect("/quanlyphim/loaiphim");
        }
      }
    );
  }

  async xoaLoaiPhim(req, res) {
    const idTheLoai = req.params.idTheLoai; 

    connection.query(
        "UPDATE TheLoai SET hienThi = 0 WHERE idTheLoai = ?",
        [idTheLoai],
        (err, result) => {
            if (err) {
                req.flash("notificationErr", "Lỗi khi vô hiệu hóa thể loại phim: " + err.message);
            } else {
                req.flash("notificationSuccess", "Vô hiệu hóa thể loại phim thành công");
            }
            res.redirect('/quanlyphim/loaiphim');
        }
    );
}


  
  async getCapNhatLoaiPhim(req, res) {
    const idTheLoai = req.params.idTheLoai;

    const query = "SELECT * FROM TheLoai WHERE idTheLoai = ? AND hienThi = 1";
    connection.query(query, [idTheLoai], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Lỗi khi lấy thông tin thể loại phim");
        } else {
            if (result.length > 0) {
                console.log(result);
                // Trả về trang cập nhật với thông tin thể loại phim
                res.render("movies/capNhatLoaiPhim", {
                    loaiPhim: result[0], // Chỉ lấy thông tin đầu tiên (nếu có)
                });
            } else {
                res.status(404).send("Không tìm thấy thể loại phim");
            }
        }
    });
}

  
  async capNhatLoaiPhim(req, res) {
    const idTheLoai = req.params.idTheLoai;
    const tenTheLoai = req.body.tenTheLoai;

    // Kiểm tra xem thể loại phim có hienThi = 1 hay không trước khi cập nhật
    const checkQuery = "SELECT hienThi FROM TheLoai WHERE idTheLoai = ?";
    connection.query(checkQuery, [idTheLoai], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Lỗi khi kiểm tra trạng thái thể loại");
            return;
        }

        if (result && result[0] && result[0].hienThi === 1) {
            // Cập nhật thông tin thể loại phim nếu nó đang hiển thị
            const updateQuery = "UPDATE TheLoai SET tenTheLoai = ? WHERE idTheLoai = ?";
            connection.query(updateQuery, [tenTheLoai, idTheLoai], (err, result) => {
                if (err) {
                    console.error(err);
                    res.status(500).send("Lỗi khi cập nhật thể loại");
                } else {
                    res.redirect("/quanlyphim/loaiphim");
                }
            });
        } else {
            res.status(400).send("Không thể cập nhật thể loại không hiển thị");
        }
    });
}

}
module.exports = new qlLoaiPhim();
