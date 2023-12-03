const sanpham = require('../model/sanPhamModel');
const upload = require('../../middleware/uploadService');
const cloudinary = require("../../middleware/cloudinary");
const sanPham = new sanpham();
const fs = require('fs');
const path = require('path');
const defaultImg = path.join(__dirname, '../../resources/upload/cinema_logo_4x.png');

class doAn {
    // GET[]/doan
    async getAllSanPham(req, res) {

        try {
            const results = await sanPham.getAllSanPham();

            const hoTenND = req.session.user[0].hoTen;
            const anhND = req.session.user[0].anh;
            const notificationSuccess = req.flash('notificationSuccess');
            const notificationErr = req.flash('notificationErr');

            res.render('popcorn/popcorn', {
                title: 'Đồ ăn',
                hoTenND: hoTenND,
                anhND: anhND,
                listDoAn: results,
                notificationErr: notificationErr,
                notificationSuccess: notificationSuccess,
            });
        } catch (err) {
            console.error(err);
            req.flash("notificationErr", "Lỗi: " + err.message);
            res.redirect('popcorn/popcorn');
        }
    }
    // GET[]doan/idDoAn
    async getSanPhamById(req, res) {
        const hoTenND = req.session.user[0].hoTen;
        const anhND = req.session.user[0].anh;
        const idDoAn = req.params.idDoAn;


        try {
            const results = await sanPham.getSanPhamById(idDoAn);

            res.render('popcorn/updatePopcorn', {
                title: 'Cập nhật đồ ăn',
                hoTenND: hoTenND,
                anhND: anhND,
                objDoAn: results,
            });
        } catch (err) {
            console.error(err);
            req.flash("notificationErr", "Lỗi: " + err.message);
            res.redirect('popcorn/popcorn');
        }
    }
    // GET[]doan/them
    async getThemSanPham(req, res) {
        const hoTenND = req.session.user[0].hoTen;
        const anhND = req.session.user[0].anh;
        res.render('popcorn/addPopcorn', {
            title: 'Thêm đồ ăn',
            hoTenND: hoTenND,
            anhND: anhND
        })
    }
    // PUT[]doan/them/luu
    async insertNewSanPham(req, res) {
        upload.single("anh")(req, res, async function (err) {
            if (err) {
                console.error("Lỗi khi thêm ảnh: " + err);
                return;
            }

            const tenDoAn = req.body.tenDoAn;
            const coSan = req.body.coSan;
            const giaDoAn = req.body.giaDoAn;
            let anhUpload;

            if (!req.file) {
                req.flash("notificationErr", "Chưa chọn ảnh");
                res.redirect("/sanpham/them");
                return;
            }


            try {
                const checkResults = await sanPham.checkIfTenDoAnExists(tenDoAn);

                if (checkResults.length > 0) {
                    req.flash("notificationErr", "Tên đồ ăn đã tồn tại");
                    res.redirect("/sanpham");
                    return;
                }
                try {
                    const result = await cloudinary.uploader.upload(req.file.path, {
                        resource_type: "image",
                        folder: "storage/product",
                    });
                    anhUpload = result.secure_url;
                } catch (cloudinaryError) {
                    console.error("Lỗi khi tải ảnh lên Cloudinary:", cloudinaryError);
                    req.flash("notificationErr", "Lỗi khi tải ảnh lên Cloudinary");
                    res.redirect("/sanpham");
                    return;
                }

                await sanPham.insertNewSanPham(tenDoAn, coSan, giaDoAn, anhUpload);

                req.flash("notificationSuccess", "Thêm thành công");
                res.redirect("/sanpham");
            } catch (err) {
                console.error('Lỗi', err.message);
                req.flash("notificationErr", "Lỗi: " + err.message);
                res.redirect("/sanpham");
            }
        });
    }
    // PUT[]doan/capnhat/:idDoAn
    async updateSanPhamById(req, res) {
        upload.single("anh")(req, res, async function (err) {
            if (err) {
                console.error('Lỗi', err);
                req.flash("notificationErr", "Lỗi");
                res.redirect('/sanpham');
                return;
            }

            const idDoAn = req.params.idDoAn;
            const tenDoAn = req.body.tenDoAn;
            const coSan = req.body.coSan;
            const giaDoAn = req.body.giaDoAn;
            const anh = req.body.urlAnh;
            let anhUpload, publicId;

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
                      folder: "storage/product",
                    });
                    anhUpload = result.secure_url;
                  } catch (cloudinaryError) {
                    console.error("Lỗi khi tải ảnh lên Cloudinary:", cloudinaryError);
                    req.flash("notificationErr", "Lỗi khi tải ảnh lên Cloudinary");
                    res.redirect("/baner");
                  }
          

                try {
                    await sanPham.updateSanPhamById(idDoAn, tenDoAn, coSan, giaDoAn, anhUpload);

                    req.flash("notificationSuccess", "Cập nhật thành công");
                    res.redirect('/sanpham');
                } catch (err) {
                    console.error('Lỗi', err);
                    req.flash("notificationErr", "Lỗi");
                    res.redirect('/sanpham');
                }
            }
        });
    }

    // PUT[]doan/xoa/:idDoAn
    async deleteSanPham(req, res) {
        const idDoAn = req.params.idDoAn;

        const sanPham = new sanpham();

        try {
            await sanPham.deleteSanPhamById(idDoAn);

            req.flash('notificationSuccess', 'Xoá thành công');
            res.redirect('/sanpham');
        } catch (err) {
            console.error('Lỗi', err.message);
            req.flash("notificationErr", "Lỗi: " + err.message);
            res.redirect("/sanpham");
        }
    }

}
module.exports = new doAn();