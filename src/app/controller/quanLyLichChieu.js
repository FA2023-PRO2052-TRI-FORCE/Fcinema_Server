const LichChieu = require('../model/lichChieuModel');
const Phim = require('../model/phimModel');
const PhongChieu = require('../model/phongChieuModel');
const lichChieu = new LichChieu();
const phim = new Phim();
const phongchieu = new PhongChieu();

class lichChieuController {
    // GET[]/lichchieu
    async getAllLichChieu(req, res) {
        const hoTenND = req.session.user[0].hoTen;
        const anhND = req.session.user[0].anh;
        const notificationSuccess = req.flash('notificationSuccess');
        const notificationErr = req.flash('notificationErr');

        try {
            const results = await lichChieu.getListLichChieu();
            res.render('showtimes/lichChieu', {
                title: 'Lịch Chiếu Phim',
                hoTenND: hoTenND,
                anhND: anhND,
                listLC: results,
                notificationErr,
                notificationSuccess
            })

        } catch (error) {
            console.error(error)

        }

    }
    // POST[]/lichchieu/tim/:tenPhim
    async searchLichChieu(req, res) {
        try {
            const tenPhimSearch = req.body["tenPhimSearch"];
            const hoTenND = req.session.user[0].hoTen;

            const results = await LichChieuModel.searchLichChieu(tenPhimSearch);

            if (results.length === 0) {
                req.flash('notificationErr', 'Không tìm thấy phim');
                res.redirect('/lichchieu');
            }

            res.render('showtimes/lichchieu', {
                title: 'Danh sách phim',
                hoTenND: hoTenND,
                listLC: results,
            });
        } catch (err) {
            console.log('Lỗi', err.message);
            res.status(500).json({ message: 'Server error' });
        }

    }

    // GET[]/lichchieu/them
    async getNewLichChieu(req, res) {
        try {
            const hoTenND = req.session.user[0].hoTen;
            const anhND = req.session.user[0].anh;
            const notificationSuccess = req.flash('notificationSuccess');
            const notificationErr = req.flash('notificationErr');
            const listPhim = await phim.getAllPhim();
            const listPC = await phongchieu.getAllPhongChieu();

            res.render('showtimes/themLichChieu', {
                title: 'Thêm Lịch Chiếu Phim',
                hoTenND: hoTenND,
                anhND: anhND,
                listPhim: listPhim,
                listPC: listPC,
                notificationErr,
                notificationSuccess
            });
        } catch (err) {
            console.error('Lỗi', err.message);
            req.flash('notificationErr', 'Lỗi' + err.message);
            res.redirect('/lichchieu');

        }
    }
    // POST[]/lichchieu/them/luu
    async addNewLichChieu(req, res) {
        try {
            const ngayChieu = req.body.ngayChieu;
            const caChieu = req.body.caChieu;
            const giaPhim = req.body.giaPhim;
            const idPhongChieu = req.body.idPhongChieu;
            const idPhim = req.body.idPhim;

            const lichChieuExists = await lichChieu.checkLichChieuExists(caChieu, ngayChieu, idPhongChieu);

            if (lichChieuExists) {
                req.flash('notificationErr', 'Ca chiếu trong ngày này đã có lịch chiếu');
                res.redirect('/lichchieu/them');
                return;
            }

            await lichChieu.insertLichChieu(ngayChieu, caChieu, giaPhim, idPhongChieu, idPhim);
            await lichChieu.updatePhimStatus(idPhim);

            req.flash('notificationSuccess', 'Thêm lịch chiếu thành công');
            res.redirect('/lichchieu');
        } catch (err) {
            console.error('Lỗi', err.message);
            req.flash('notificationErr', 'Lỗi' + err.message);
            res.redirect('/lichchieu');

        }
    }

    // GET[]/lichchieu/sua/:idLichChieu
    async getChiTietLichChieu(req, res) {
        try {
            const hoTenND = req.session.user[0].hoTen;
            const anhND = req.session.user[0].anh;
            const idLichChieu = req.params.idLichChieu;

            const results = await lichChieu.getChiTietLichChieu(idLichChieu);

            const objLC = JSON.parse(JSON.stringify(results));

            console.log('Results',objLC);
            res.render('showtimes/suaLichChieu', {
                title: 'Cập nhật Lịch Chiếu Phim',
                hoTenND: hoTenND,
                anhND: anhND,
                objectLichChhieu: objLC,
            });
        } catch (err) {
            console.error('Lỗi', err.message);
            req.flash('notificationErr', 'Lỗi' + err.message);
            res.redirect('/lichchieu');
        }

    }
    // PUT/lichchieu/sua/:idLichChieu {{Lỗi}}
    async updateLichChieu(req, res) {
        try {
            const idLichChieu = req.params.idLichChieu;
            const ngayChieu = req.body.ngayChieu;
            const caChieu = req.body.caChieu;
            const giaPhim = req.body.giaPhim;
            const idPhongChieu = req.body.idPhongChieu;
            const idPhim = req.body.idPhim;

            const lichChieuExists = await lichChieu.checkLichChieuExists(caChieu, ngayChieu, idPhongChieu);

            if (lichChieuExists) {
                req.flash('notificationErr', 'Ca chiếu trong ngày này đã có lịch chiếu');
                res.redirect('/lichchieu/them');
                return;
            }
            await lichChieu.updateLichChieu(ngayChieu, caChieu, giaPhim, idLichChieu);
            req.flash('notificationSuccess', 'Cập nhật lịch chiếu thành công');
            res.redirect('/lichchieu');

        } catch (err) {
            console.error('Lỗi', err.message);
            req.flash('notificationErr', 'Lỗi' + err.message);
            res.redirect('/lichchieu');
        }

    }
    // PUT[]/lichchieu/luutru
    async deleteLichChieu(req, res) {
        try {
            const idLichChieu = req.params.idLichChieu;

            await lichChieu.deleteLichChieu(idLichChieu);

            req.flash('notificationSuccess', 'Xoá lịch chiếu thành công');
            res.redirect('/lichChieu');
        } catch (err) {
            console.error('Lỗi update trạng thái phim', err.message);
            res.status(500).json({ message: 'Server error' });
        }

    }

}
module.exports = new lichChieuController();