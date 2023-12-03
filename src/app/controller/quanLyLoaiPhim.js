const LoaiPhim = require('../model/loaiPhimModel');
const loaiPhim = new LoaiPhim();

class qlLoaiPhim {
    async getAllLoaiPhim(req, res) {
        try {
            const hoTenND = req.session.user[0].hoTen;
            const anhND = req.session.user[0].anh;

            const result = await loaiPhim.getAllLoaiPhim();

            const notificationSuccess = req.flash('notificationSuccess');
            const notificationErr = req.flash('notificationErr');

            res.render('movies/loaiPhim', {
                title: 'Danh sách thể loại phim',
                listTheLoai: result,
                hoTenND: hoTenND,
                anhND: anhND,
                notificationErr,
                notificationSuccess,
            });
        } catch (err) {
            console.error('Lỗi', err.message);
            req.flash("notificationErr", "Lỗi" + err.message);
            res.redirect('back');
        }
    }

    async insertLoaiPhim(req, res) {
        try {
            const tenTheLoai = req.body.tenTheLoai;
            const hienThi = 1;

            const tenTheLoaiExists = await loaiPhim.checkTenTheLoaiExists(tenTheLoai);

            if (tenTheLoaiExists) {
                req.flash('notificationErr', 'Tên thể loại đã tồn tại');
                res.redirect('/quanlyphim/loaiphim');
                return;
            }

            await loaiPhim.insertLoaiPhim(tenTheLoai, hienThi);

            req.flash('notificationSuccess', 'Thêm loại phim thành công');
            res.redirect('/quanlyphim/loaiphim');
        } catch (err) {
            console.error('Lỗi', err.message);
            req.flash('notificationErr', 'Lỗi' + err.message);
            res.redirect('/quanlyphim/loaiphim');
        }
    }

    async getLoaiPhimByIdLoaiPhim(req, res) {
        try {
            const idTheLoai = req.params.idTheLoai;
            const hoTenND = req.session.user[0].hoTen;

            const result = await LoaiPhimModel.getLoaiPhimById(idTheLoai);

            if (result.length > 0) {
                console.log(result);
                res.render('movies/capNhatLoaiPhim', {
                    loaiPhim: result[0],
                    hoTenND: hoTenND,
                });
            } else {
                req.flash('notificationErr', 'Lỗi cập nhật');
                res.redirect('/quanlyphim/loaiphim');
            }
        } catch (err) {
            console.error('Lỗi', err.message);
            req.flash('notificationErr', 'Lỗi' + err.message);
            res.redirect('/quanlyphim/loaiphim');
        }

    }

    async updateLoaiPhimByIdLoaiPhim(req, res) {
        try {
            const idTheLoai = req.params.idTheLoai;
            const tenTheLoai = req.body.tenTheLoai;

            const tenTheLoaiExists = await loaiPhim.checkTenTheLoaiExists(tenTheLoai);

            if (tenTheLoaiExists) {
                req.flash('notificationErr', 'Tên thể loại đã tồn tại');
                res.redirect('/quanlyphim/loaiphim');
                return;
            }

            await loaiPhim.updateLoaiPhimById(idTheLoai, tenTheLoai);

            req.flash('notificationSuccess', 'Cập nhật thành công');
            res.redirect('/quanlyphim/loaiphim');
        } catch (err) {
            console.error(err);
            req.flash('notificationErr', 'Lỗi cập nhật');
            res.redirect('/quanlyphim/loaiphim');
        }
    }

    async deleteLoaiPhimByIdLoaiPhim(req, res) {
        try {
            const idTheLoai = req.params.idTheLoai;

            await loaiPhim.deleteLoaiPhimByIdLoaiPhim(idTheLoai);

            req.flash('notificationSuccess', 'Xoá thể loại phim thành công');
            res.redirect('/quanlyphim/loaiphim');
        } catch (err) {
            console.error('Lỗi khi xoá thể loại phim: ' + err.message);
            req.flash('notificationErr', 'Lỗi khi xoá thể loại phim');
            res.redirect('/quanlyphim/loaiphim');
        }
    }


}
module.exports = new qlLoaiPhim();
