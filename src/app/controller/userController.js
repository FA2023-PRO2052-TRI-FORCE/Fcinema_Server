const khachHangModel = require('../model/userModel');
const khachang = new khachHangModel();

class userController {
    // GET[]/khachhang
    async getListKhachHang(req, res) {
        const hoTenND = req.session.user[0].hoTen;
        const anhND = req.session.user[0].anh;
        const idNhanVien = req.session.user[0].idNhanVien;

        try {
            const results = await khachang.getAllKhachhang();
            res.render('users/user', {
                title: 'Khách Hàng',
                hoTenND: hoTenND,
                anhND: anhND,
                idNhanVien,
                listKH: results
            })

        } catch (error) {
            console.error(err);
            req.flash("notificationErr", "Lỗi: " + err.message);
            res.redirect('/khachhang');
        }

    }
    // GET[]/khachhang/:email
    async getKhachHangByEmail(req, res) {
        const hoTenND = req.session.user[0].hoTen;
        const anhND = req.session.user[0].anh;
        const idNhanVien = req.session.user[0].idNhanVien;
        const email = req.params.email;

        try {
            const results = await khachang.getKhachHangByEmail(email);
            res.render('users/detailUser', {
                title: "Chi tiết khách hàng",
                hoTenND: hoTenND,
                anhND: anhND,
                idNhanVien,
                listKH: results
            })

        } catch (error) {
            console.error(error);
            req.flash('notificationErr', 'Lỗi');
            res.redirect('back')
        }

    }
    // PUT[]khachhang/:email
    async updateTrangThaiKhachHang(req, res) {
        const email = req.params.email

        try {
            const results = await khachang.updateKhachHangByEmail(email);
            if (results.changedRows > 0) {
                req.flash('notificationSuccess', 'Xoá thành công');
                res.redirect('back')
            } else {
                req.flash('notificationErr', 'Lỗi');
                res.redirect('back')
            }

        } catch (error) {
            console.error(error);
            req.flash('notificationErr', 'Lỗi');
            res.redirect('back')
        }


    }


}
module.exports = new userController()