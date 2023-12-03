const PhimModel = require("../model/phimModel");
const LoaiPhim = require("../model/loaiPhimModel");
const upload = require("../../middleware/uploadService");
const cloudinary = require("../../middleware/cloudinary");
const phimModel = new PhimModel();
const loaiPhim = new LoaiPhim();
const fs = require("fs");
const path = require("path");
const defaultImg = path.join(__dirname,"../../resources/upload/cinema_logo_4x.png");

class quanLyPhim {
  //GET[]/phim
  async getPhims(req, res) {
    try {
      const hoTenND = req.session.user[0].hoTen;
      const anhND = req.session.user[0].anh;
      const result = await phimModel.getListPhim();

      const notificationSuccess = req.flash("notificationSuccess");
      const notificationErr = req.flash("notificationErr");

      res.render("movies/phim", {
        title: "Danh sách phim",
        listPhim: result,
        hoTenND,
        anhND,
        notificationErr,
        notificationSuccess
      });
    } catch (error) {
      console.error("Lỗi", error.message);
      res.redirect("back");
    }
  }

  // GET/phim/them
  async getAddNewPhim(req, res) {
    try {
      const hoTenND = req.session.user[0].hoTen;
      const anhND = req.session.user[0].anh;

      const notificationSuccess = req.flash('notificationSuccess');
      const notificationErr = req.flash('notificationErr');
      const results = await loaiPhim.getAllLoaiPhim();

      res.render("movies/themphim", {
        title: "Thêm phim mới",
        listTheLoai: results,
        hoTenND,
        anhND,
        notificationErr: notificationErr,
        notificationSuccess: notificationSuccess,
      });
    } catch (error) {
      console.error("Lỗi", error.message);
      res.status(500).send("Internal Server Error");
    }
  }

  // GET/phim/capnhat/:idPhim
  async getUpdatePhim(req, res) {
    try {
      const idPhim = req.params.idPhim;
      const hoTenND = req.session.user[0].hoTen;
      const anhND = req.session.user[0].anh;

      const results = await phimModel.getPhimById(idPhim);

      res.render("movies/suaPhim", {
        title: "Cập nhật phim",
        listPhim: JSON.parse(JSON.stringify(results)),
        hoTenND: hoTenND,
        anhND: anhND
      });
    } catch (error) {
      console.error(error.message);
      req.flash("notificationErr", "Lỗi: " + error.message);
      res.redirect("/quanlyphim/phim");
    }
  }

  // POST[]/quanlyphim/phim/them/luu
  async insertNewPhim(req, res) {
    upload.single("anh")(req, res, async function (err) {
      if (err) {
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
        const dienVien = req.body.dienVien;
        const idTheLoai = req.body.idTheLoai;
        const ngayThem = new Date();
        const dienVienArray = JSON.stringify(dienVien);

        let anhUpload;

        if (!req.file) {
          req.flash("notificationErr", "Chưa chọn ảnh");
          res.redirect("/quanlyphim/phim/them");
          return;
        }
        try {

          try {
            const result = await cloudinary.uploader.upload(req.file.path, {
              resource_type: "image",
              folder: "storage/movie",
            });
            anhUpload = result.secure_url;
          } catch (cloudinaryError) {
            console.error("Lỗi khi tải ảnh lên Cloudinary:", cloudinaryError);
            req.flash("notificationErr", "Lỗi khi tải ảnh lên Cloudinary");
            res.redirect("/quanlyphim");
            return;
          }
          const values = [tenPhim, anhUpload, ngonNgu, moTa, hangSX, nuocSX, namSX, thoiLuong, daoDien, dienVienArray, idTheLoai, ngayThem];
          await phimModel.insertPhim(values);

          req.flash("notificationSuccess", "Thêm phim mới thành công");
          res.redirect("/quanlyphim/phim");
        } catch (error) {
          console.log(error.message);
          req.flash("notificationErr", "Lỗi khi thêm phim: " + error.message);
          res.redirect("/quanlyphim/phim");
        }
      }
    });
  }

  // PUT/phim/capnhat/:idPhim
  updatePhim(req, res) {
    upload.single("anh")(req, res, async function (err) {

      const idPhim = req.params.idPhim;
      const ngonNgu = req.body.ngonNgu;
      const moTa = req.body.moTa;
      const hangSX = req.body.hangSX;
      const nuocSX = req.body.nuocSX;
      const anh = req.body.originalUrl;
      const thoiLuong = req.body.thoiLuong;
      const daoDien = req.body.daoDien;
      const dienVien = req.body.dienVien;
      const dienVienArray = JSON.stringify(dienVien);
      let anhUpload, publicId;
      console.log('Anh', anh)


      const publicIdMatch = anh.match(/\/v\d+\/(.+?)\.\w+$/);

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
            folder: "storage/movie",
          });
          anhUpload = result.secure_url;
        } catch (cloudinaryError) {
          console.error("Lỗi khi tải ảnh lên Cloudinary:", cloudinaryError);
          req.flash("notificationErr", "Lỗi khi tải ảnh lên Cloudinary");
          res.redirect("/baner");
        }

      }

      await phimModel.updatePhim(idPhim, ngonNgu, moTa, daoDien, dienVienArray, hangSX, thoiLuong, nuocSX, anhUpload, (err, results) => {
        if (err) {
          console.error("Lỗi", err);
          req.flash("notificationErr", "Lỗi");
          res.redirect("/quanlyphim/phim");
        } else {
          req.flash("notificationSuccess", "Cập nhật phim thành công");
          res.redirect("/quanlyphim/phim");
        }
      });
    });
  }
  //   PUT[]/phim/xoa/idPhim
  async deletePhim(req, res) {
    const idPhim = req.params.idPhim;

    try {
      await phimModel.deletePhim(idPhim);
      req.flash("notificationSuccess", "Xóa phim thành công");
    } catch (err) {
      req.flash("notificationErr", "Xóa phim thất bại: " + err.message);
    }

    res.redirect("/quanlyphim/phim");
  }

}
module.exports = new quanLyPhim();
