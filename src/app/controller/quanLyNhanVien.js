const connection = require("../../config/connection");
const fs = require('fs');
const path = require('path');
const upload = require("../../middleware/uploadService");
const defaultImg= path.join(__dirname,'../../resources/upload/cinema_logo_4x.png');

class qlNhanVien {
  // GET[]/nhanvien
  async getAllNhanVien(req, res) {
    const hoTenND=req.session.user[0].hoTen;
    const anhND=req.session.user[0].anh;
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
        hoTenND:hoTenND,
        anhND:anhND,
        notificationErr,
        notificationSuccess,
      });
    });
  }
  // GET[]/nhanvien/them
  async getAddNhanVien(req, res) {
    const hoTenND=req.session.user[0].hoTen;
    const anhND=req.session.user[0].anh; 
    const notificationSuccess = req.flash("notificationSuccess");
    const notificationErr = req.flash("notificationErr");
    res.render("employees/themNhanVien",{
      title:"Thêm nhân viên",
      notificationSuccess:notificationSuccess,
      notificationErr:notificationErr,
      hoTenND:hoTenND,
      anhND:anhND
    });
  }

  // POST[]/nhanvien/them/luu
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
        let anhStringBase64 = null;
  
        var emailRegex = /^\S+@\S+\.\S+$/;
        var dienThoaiRegex = /^(\+84|0)[1-9]\d{8}$/;
  
        if (!emailRegex.test(email)) {
          req.flash("notificationErr", "Email định dạng không đúng");
          return res.redirect('/nhanvien/them');
        }
  
        if (!dienThoaiRegex.test(dienThoai)) {
          req.flash("notificationErr", "Điện thoại định dạng không đúng");
          return res.redirect('/nhanvien/them');
        }
  
        if (req.file) {
          var anh = fs.readFileSync(req.file.path);
          anhStringBase64 = anh.toString("base64");
        } else {
          var anhDefault = fs.readFileSync(defaultImg);
          anhStringBase64 = anhDefault.toString("base64");
        }
  
        const checkQuerry = `SELECT * FROM NhanVien WHERE idNhanVien=?`;
        const insertNhanVienQuerry = `INSERT INTO NhanVien (idNhanVien, hoTen, matKhau, email, dienThoai, vaiTro, ngaySinh, diaChi, gioiTinh, hienThi, anh) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const insertNhanVienValues = [idNhanVien,hoTen,matKhau,email,dienThoai,vaiTro,ngaySinh,diaChi,gioiTinh,hienThi,anhStringBase64];
  
        connection.query(checkQuerry, [idNhanVien], (checkErr, checkResults) => {
          
          if (checkResults.length > 0) {
            const errors = [];
          
            checkResults.forEach(existingEmployee => {
              if (existingEmployee.idNhanVien === idNhanVien) {
                errors.push("Mã nhân viên đã được sử dụng");
              }
          
              if (existingEmployee.email === email) {
                errors.push("Email đã được sử dụng");
              }
          
              if (existingEmployee.dienThoai === dienThoai) {
                errors.push("Số điện thoại đã được sử dụng");
              }
            });
          
            if (errors.length > 0) {
              errors.forEach(error => {
                req.flash("notificationErr", error);
              });
              return res.redirect("/nhanvien/them");
            }
          }
          
      
          connection.query(insertNhanVienQuerry, insertNhanVienValues, (err, results) => {
            if (err) {
              req.flash(
                "notificationErr",
                "Lỗi khi thêm nhân viên: " + err.message
              );
              return res.redirect("/nhanvien");
            } else {
              req.flash("notificationSuccess", "Thêm nhân viên thành công");
              res.redirect("/nhanvien");
            }
          });
        });
      }
    });
  }
  

  // PUT[]delete/:idNhanVien
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
        req.flash("notificationSuccess", "Xóa nhân viên thành công");
        res.redirect("/nhanvien"); // Hoặc thực hiện bất kỳ hành động nào sau khi xóa
      }
    });
  }


  // GET[]nhanvien/sua
  async getUpdateEmployee(req, res) {
    const idNhanVien = req.params.id;
    const hoTenND=req.session.user[0].hoTen;
    const anhND=req.session.user[0].anh;    
    const selectEmployeeQuery = "SELECT * FROM NhanVien WHERE idNhanVien = ?";

    connection.query(selectEmployeeQuery, [idNhanVien], (err, results) => {
      if (err) {
        // Xử lý lỗi
        console.error(err);
        req.flash("notificationErr", "Lỗi khi lấy thông tin nhân viên");
      } else {
        if (results.length > 0) {
          const listNhanVien=JSON.parse(JSON.stringify(results));
          res.render("employees/suaNhanVien", {
            listNhanVien: listNhanVien,
            title:"Cập nhật thông tin nhân viên",
            hoTenND:hoTenND,
            anhND:anhND,
          });
        } else {
          req.flash("notificationErr", "Không tìm thấy nhân viên");
          res.redirect("/nhanvien");
        }
      }
    });
  }

  // PUT[]/nhanvien/sua:idNhanVien
  async updateEmployee(req, res) {
    upload.single('anh')(req, res, function (err) {
      if (err) {
        console.error(err);
        return;
      }
  
      const idNhanVien = req.params.idNhanVien;
      const hoTen = req.body.hoTen;
      const gioiTinh = req.body.gioiTinh;
      const ngaySinh = req.body.ngaySinh;
      const email = req.body.email;
      const dienThoai = req.body.dienThoai;
      const diaChi = req.body.diaChi;
      let anhStringBase64;

      const emailRegex = /^\S+@\S+\.\S+$/;
      const dienThoaiRegex = /^(\+84|0)[1-9]\d{8}$/;
  
      if (!emailRegex.test(email)) {
        req.flash("notificationErr", "Email định dạng không đúng");
        return res.redirect('/nhanvien/sua');
      }
  
      if (!dienThoaiRegex.test(dienThoai)) {
        req.flash("notificationErr", "Điện thoại định dạng không đúng");
        return res.redirect('/nhanvien/sua');
      }
  


      if (req.file) {
        const anh = fs.readFileSync(req.file.path);
        anhStringBase64 = anh.toString("base64");
      }
  
      let updateEmployeeQuery;
      let updateEmployeeValues;

      if(anhStringBase64){
        updateEmployeeQuery=`UPDATE NhanVien SET hoTen = ?, gioiTinh = ?, ngaySinh = ?, diaChi = ?, anh = ?, email=?, dienThoai=? WHERE idNhanVien = ?`;
        updateEmployeeValues=[hoTen, gioiTinh, new Date(ngaySinh), diaChi, anhStringBase64, email, dienThoai, idNhanVien];

      }else{
        updateEmployeeQuery=`UPDATE NhanVien SET hoTen = ?, gioiTinh = ?, ngaySinh = ?, diaChi = ?, email=?, dienThoai=? WHERE idNhanVien = ?`;
        updateEmployeeValues=[hoTen, gioiTinh, new Date(ngaySinh), diaChi, email, dienThoai, idNhanVien];
      }
      
      connection.query(updateEmployeeQuery,updateEmployeeValues,(err,results) =>{
        if (err) {
          console.error(err);
          req.flash("notificationErr", "Lỗi cập nhật ");
          res.redirect("/nhanvien/sua");
          return;
        } else {
          req.flash("notificationSuccess", "Cập nhật thành công");
          res.redirect("/nhanvien");

        }
      });

    });
  }
  
}
module.exports = new qlNhanVien();
