const NhanVien = require('../model/nhanVienModel');
const nhanVien = new NhanVien();
const cloudinary = require("../../middleware/cloudinary");
const upload = require("../../middleware/uploadService");
const fs = require('fs');
const path = require('path');
const defaultImg = path.join(__dirname, '../../resources/upload/cinema_logo_4x.png');

class qlNhanVien {
  // GET[]/nhanvien
  async getAllNhanVien(req, res) {
    try {
      const hoTenND = req.session.user[0].hoTen;
      const anhND = req.session.user[0].anh;
      const idNhanVien = req.session.user[0].idNhanVien;

      const results = await nhanVien.getAllNhanVien();

      const notificationSuccess = req.flash('notificationSuccess');
      const notificationErr = req.flash('notificationErr');

      res.render('employees/nhanvien', {
        listNhanVien: results,
        title: 'Nhân Viên',
        hoTenND: hoTenND,
        anhND: anhND,
        idNhanVien,
        notificationErr,
        notificationSuccess,
      });
    } catch (err) {
      console.error('Lỗi', err.message);
      req.flash("notificationErr", "Lỗi" + err.message);
      res.redirect('back');
    }
  }
  // GET[]/nhanvien/them
  async getAddNhanVien(req, res) {
    const hoTenND = req.session.user[0].hoTen;
    const anhND = req.session.user[0].anh;
    const idNhanVien = req.session.user[0].idNhanVien;

    const notificationSuccess = req.flash("notificationSuccess");
    const notificationErr = req.flash("notificationErr");

    res.render("employees/themNhanVien", {
      title: "Thêm nhân viên",
      notificationSuccess: notificationSuccess,
      notificationErr: notificationErr,
      hoTenND: hoTenND,
      anhND: anhND,
      idNhanVien
    });
  }

  // POST[]/nhanvien/them/luu
  async insertNewNhanVien(req, res) {
    upload.single("anh")(req, res, async function (err) {
      try {
        if (err) {
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
          let anhUpload;

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

          if (!req.file) {
            req.flash("notificationErr", "Chưa chọn ảnh");
            return res.redirect('/nhanvien/them');
          }

          const checkResults = await nhanVien.checkNhanVienByIdEmailPhone(idNhanVien, email, dienThoai);

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

          try {
            const result = await cloudinary.uploader.upload(req.file.path, {
              resource_type: "image",
              folder: "storage/users",
            });
            anhUpload = result.secure_url;
          } catch (cloudinaryError) {
            console.error("Lỗi khi tải ảnh lên Cloudinary:", cloudinaryError);
            req.flash("notificationErr", "Lỗi khi tải ảnh lên Cloudinary");
            res.redirect("/quanlyphim");
            return;
          }          

          const nhanVienData = { idNhanVien, hoTen, matKhau, email, dienThoai, gioiTinh, ngaySinh, diaChi, vaiTro, hienThi, anh: anhUpload };

          await nhanVien.insertNhanVien(nhanVienData);

          req.flash("notificationSuccess", "Thêm nhân viên thành công");
          res.redirect("/nhanvien");
        }
      } catch (err) {
        console.error('Lỗi', err.message);
        req.flash('notificationErr', 'Lỗi khi thêm nhân viên');
        res.redirect('/nhanvien');
      }
    });
  }

  // PUT[]delete/:idNhanVien
  async deleteNhanVienById(req, res) {
    try {
      const idNhanVien = req.params.idNhanVien;

      await nhanVien.deleteNhanVieByIdNhanVien(idNhanVien);

      req.flash('notificationSuccess', 'Xóa nhân viên thành công');
      res.redirect('/nhanvien');
    } catch (err) {
      console.error('Lỗi', err.message);
      req.flash('notificationErr', 'Lỗi khi xóa nhân viên');
      res.redirect('/nhanvien');
    }
  }


  // GET[]nhanvien/sua
  async getNhanVienById(req, res) {
    try {
      const idNhanVien = req.params.id;
      const hoTenND = req.session.user[0].hoTen;
      const anhND = req.session.user[0].anh;

      const results = await nhanVien.getNhanVienById(idNhanVien);

      if (results.length > 0) {
        const listNhanVien = JSON.parse(JSON.stringify(results));
        res.render('employees/suaNhanVien', {
          listNhanVien: listNhanVien,
          title: 'Cập nhật thông tin nhân viên',
          hoTenND: hoTenND,
          anhND: anhND,
        });
      } else {
        req.flash('notificationErr', 'Không tìm thấy nhân viên');
        res.redirect('/nhanvien');
      }
    } catch (err) {
      console.error('Lỗi', err.message);
      req.flash('notificationErr', 'Lỗi khi lấy thông tin nhân viên');
      res.redirect('/nhanvien');
    }
  }

  // PUT[]/nhanvien/sua:idNhanVien
  async updateNhanVienById(req, res) {
    upload.single('anh')(req, res, async function (err) {
      if (err) {
        console.error(err);
        req.flash('notificationErr', 'Lỗi tải file');
        return res.redirect('/nhanvien/sua');
      }

      const idNhanVien = req.params.idNhanVien;
      const hoTen = req.body.hoTen;
      const gioiTinh = req.body.gioiTinh;
      const ngaySinh = req.body.ngaySinh;
      const diaChi = req.body.diaChi;
      const email = req.body.email;
      const dienThoai = req.body.dienThoai;

      try {
        const anhStringBase64 = req.file ? fs.readFileSync(req.file.path).toString('base64') : null;

        await nhanVien.updateNhanVienById(idNhanVien, hoTen, gioiTinh, ngaySinh, diaChi, email, dienThoai, anhStringBase64);

        req.flash('notificationSuccess', 'Cập nhật thành công');
        res.redirect('/nhanvien');
      } catch (error) {
        console.error(error);
        req.flash('notificationErr', 'Lỗi cập nhật');
        res.redirect('/nhanvien/sua');
      }
    });
  }

}
module.exports = new qlNhanVien();
