const banerModel = require('../model/banerModel');

const baner = new banerModel();
const upload = require('../../middleware/uploadService');
const fs = require('fs');

class QLBaner {
    // [GET]/baner
    async getAllBaner(req, res) {
        try {
            const results = await baner.getAllBaner();

            const hoTenND = req.session.user[0].hoTen;
            const anhND = req.session.user[0].anh;
            const notificationSuccess = req.flash('notificationSuccess');
            const notificationErr = req.flash('notificationErr');

            res.render('baner/baner', {
                title: 'Baner',
                hoTenND: hoTenND,
                anhND: anhND,
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

    // POST[]/baner/them
    async insertNewBaner(req, res) {
        upload.single("anh")(req, res, async function (err) {
            if (err) {
                console.error("Lỗi: " + err);
                return;
            }

            let anhStringBase64;

            if (req.file) {
                const anh = fs.readFileSync(req.file.path);
                anhStringBase64 = anh.toString("base64");

                try {
                    const baner = new banerModel();
                    await baner.insertNewBaner(anhStringBase64);

                    req.flash("notificationSuccess", "Thêm baner thành công");
                    res.redirect("/baner");
                } catch (error) {
                    console.error("Lỗi khi thêm ảnh: " + error);
                    req.flash("notificationErr", "Lỗi ");
                    res.redirect("/baner");
                }
            } else {
                req.flash("notificationErr", "Chưa chọn ảnh");
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

        try {
            await baner.deleteBaner(idBaner);

            req.flash('notificationSuccess', 'Xoá thành công');
            res.redirect('/baner');
        } catch (err) {
            console.error('Lỗi', err.message);
            req.flash("notificationErr", "Lỗi: " + err.message);
            res.redirect("/baner");
        }
    }
}

module.exports = new QLBaner();