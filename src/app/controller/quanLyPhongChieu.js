const PhongChieu = require('../model/phongChieuModel');
const phongChieu = new PhongChieu();

class quanLyPhongChieu {
    //GET[]/phongchieu
    async getAllPhongChieu(req, res) {
        try {
            const hoTenND = req.session.user[0].hoTen;
            const anhND = req.session.user[0].anh;

            const listPC = await phongChieu.getPhongChieus();

            const notificationSuccess = req.flash('notificationSuccess');
            const notificationErr = req.flash('notificationErr');

            res.render('others/phongChieu', {
                title: 'Phòng Chiếu',
                hoTenND,
                anhND,
                listPC,
                notificationErr,
                notificationSuccess,
            });
        } catch (error) {
            console.error(error);
            req.flash('notificationErr', 'Lỗi xử lý dữ liệu');
            res.redirect('/error-page'); // Redirect to an error page or handle it as needed
        }
    }
    // PUT[]/phongchieu/:idPhongChieu
    async updatePhongChieu(req, res) {
        try {
            const idPhongChieu = req.params.idPhongChieu;
            const trangThai = req.body.trangThai;

            await phongChieu.updateTrangThaiPhongChieu(idPhongChieu, trangThai)
            req.flash('notificationSuccess', 'Reset thành công');
            res.redirect("back");

        } catch (error) {
            console.error(error)
            req.flash('notificationErr', 'Lỗi' + error);
            res.redirect("back");
            return;
        }


    }
}
module.exports = new quanLyPhongChieu()