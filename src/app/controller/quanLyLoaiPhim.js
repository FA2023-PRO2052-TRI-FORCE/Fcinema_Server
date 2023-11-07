const connection = require("../../config/connection");
const express = require("express");

class qlLoaiPhim {
  async dsLoaiPhim(req, res) {
    const hoTenND=req.session.user[0].hoTen;
    const anhND=req.session.user[0].anh;
    connection.query("SELECT * FROM TheLoai WHERE hienThi = 1", (err, result) => {
        if (err) {
            console.error("Lỗi", err.message);
            return;
        }
        console.log(result);
        const notificationSuccess = req.flash('notificationSuccess');
        const notificationErr = req.flash('notificationErr'); 
        res.render("movies/loaiPhim", {
            title:'Danh sách thể loại phim',
            listTheLoai: result,
            hoTenND:hoTenND,
            anhND:anhND,
            notificationErr,
            notificationSuccess
        });
    });
  }
  
  async themLoaiPhim(req, res) {
    const tenTheLoai = req.body.tenTheLoai;
    const hienThi = 1

    const checkQuery=`SELECT * FROM TheLoai WHERE tenTheLoai=?`;
    connection.query(checkQuery,[tenTheLoai],(checkErr,checkResult)=>{
        if(checkResult.length>0){
            req.flash('notificationErr','Tên thể loại đã tồn tại');
            res.redirect("/quanlyphim/loaiphim");
            return;
        }

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
    })

  }

  async xoaLoaiPhim(req, res) {
    const idTheLoai = req.params.idTheLoai; 

    connection.query(
        "UPDATE TheLoai SET hienThi = 0 WHERE idTheLoai = ?",
        [idTheLoai],
        (err, result) => {
            if (err) {
                req.flash("notificationErr", "Lỗi khi xoá thể loại phim: " + err.message);
            } else {
                req.flash("notificationSuccess", "Xoá thể loại phim thành công");
            }
            res.redirect('/quanlyphim/loaiphim');
        }
    );
}


  
  async getCapNhatLoaiPhim(req, res) {
    const idTheLoai = req.params.idTheLoai;
    const hoTenND=req.session.user[0].hoTen;

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
                    loaiPhim: result[0],
                    hoTenND:hoTenND 
                });
            } else {
                req.flash("notificationErr", "Lỗi cập nhật ");
                res.redirect('/quanlyphim/loaiphim');
            }
        }
    });
}

  
  async capNhatLoaiPhim(req, res) {
    const idTheLoai = req.params.idTheLoai;
    const tenTheLoai = req.body.tenTheLoai;
    
    const checkQuery = "SELECT * FROM TheLoai WHERE tenTheLoai = ?";
    connection.query(checkQuery, [tenTheLoai], (err, result) => {
        if (err) {
            console.error(err);
            req.flash("notificationErr", "Lỗi");
            res.redirect('/quanlyphim/loaiphim');
            return;
        }

        if (result.length>0 && result[0].hienThi==1) {
            req.flash("notificationErr", "Tên thể loại đã có");
            res.redirect('/quanlyphim/loaiphim'); 
            return; 
        } 
        const updateQuery = "UPDATE TheLoai SET tenTheLoai = ? WHERE idTheLoai = ?";
        connection.query(updateQuery, [tenTheLoai, idTheLoai], (err, result) => {
            if (err) {
                console.error(err);
                req.flash("notificationErr", "Lỗi cập nhật ");
                res.redirect('/quanlyphim/loaiphim');
            } else {
                req.flash("notificationSuccess", "Cập nhật thành công");
                res.redirect("/quanlyphim/loaiphim");
            }
        });         
    });
}

}
module.exports = new qlLoaiPhim();
