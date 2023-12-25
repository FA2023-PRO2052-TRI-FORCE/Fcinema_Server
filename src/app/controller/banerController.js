const banerModel = require('../model/banerModel');
const baner = new banerModel();
const upload = require('../../middleware/uploadService');
const cloudinary = require('../../middleware/cloudinary');
const fs = require('fs');

class bannerController {
    // [GET]/baner
    async getAllBaner(req, res) {
        try {
            const results = await baner.getAllBaner();

            const hoTenND = req.session.user[0].hoTen;
            const anhND = req.session.user[0].anh;
            const idNhanVien = req.session.user[0].idNhanVien;

            const notificationSuccess = req.flash('notificationSuccess');
            const notificationErr = req.flash('notificationErr');

            res.render('baner/baner', {
                title: 'Baner',
                hoTenND: hoTenND,
                anhND: anhND,
                idNhanVien,
                listBaner: results,
                notificationErr: notificationErr,
                notificationSuccess: notificationSuccess,
            });
        } catch (err) {
            console.error(err);
            req.flash("notificationErr", "Lỗi: " + err.message);
            res.redirect('/baner');
        }
    }

    // GET[]/app/baner
    async getBaners(req, res) {
        try {
            const ressults = await baner.getAllBaner();

            res.send(ressults);

        } catch (error) {
            console.error(err);
            res.status(404).json({ message: "Lỗi" });

        }
    }

    // POST[]/baner/them
    async insertNewBaner(req, res) {
        upload.single("anh")(req, res, async function (err) {
            if (err) {
                console.error("Lỗi khi tải ảnh lên: " + err);
                req.flash("notificationErr", "Lỗi khi tải ảnh lên");
                res.redirect("/baner");
                return;
            }

            if (!req.file) {
                req.flash("notificationErr", "Chưa chọn ảnh");
                res.redirect("/baner");
                return;
            }

            try {
                let anhUpload;
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
                    return;
                }

                const baner = new banerModel();
                await baner.insertNewBaner(anhUpload);

                req.flash("notificationSuccess", "Thêm banner thành công");
                res.redirect("/baner");
            } catch (error) {
                console.error("Lỗi khi thực hiện thêm banner:", error);
                req.flash("notificationErr", "Lỗi khi thêm banner");
                res.redirect("/baner");
            }
        });
    }

    // PUT[]/baner/update/:idBaner
    async updateBaner(req, res) {
        upload.single("anh")(req, res, async function (err) {
            if (err) {
                console.error('Lỗi', err);
                req.flash("notificationErr", "Lỗi");
                res.redirect('/baner');
                return;
            }
            const idBaner = req.params.idBaner;
            let anhStringBase64 = null;
            if (req.file) {
                const anh = fs.readFileSync(req.file.path);
                anhStringBase64 = anh.toString("base64");

                try {
                    await baner.updateBaner(anhStringBase64, idBaner);

                    req.flash("notificationSuccess", "Cập nhật baner thành công");
                    res.redirect("/baner");
                } catch (error) {
                    console.error("Lỗi khi thêm ảnh: " + error);
                    req.flash("notificationErr", "Lỗi");
                    res.redirect("/baner");
                }
            } else {
                res.redirect('/baner')
            }
        });
    }
    // PUT[]/delete baner
    async deleteBaner(req, res) {
        const idBaner = req.params.idBaner;
        const anh = req.body.urlAnh;

        const publicIdMatch = anh.match(/\/v\d+\/(.+?)\.\w+$/);

        let publicId;

        if (publicIdMatch && publicIdMatch[1]) {
            publicId = publicIdMatch[1];
            console.log("Public ID:====", publicId);

            try {
                if (publicId) {
                    await cloudinary.uploader.destroy(publicId);
                }

                await baner.deleteBaner(idBaner);

                req.flash('notificationSuccess', 'Xoá thành công');
                res.redirect('/baner');
            } catch (err) {
                console.error('Lỗi', err.message);
                req.flash("notificationErr", "Lỗi: " + err.message);
                res.redirect("/baner");
            }
        } else {
            console.error("Không thể xuất ra idPublic cloudinary");
        }
    }





}

module.exports = new bannerController();