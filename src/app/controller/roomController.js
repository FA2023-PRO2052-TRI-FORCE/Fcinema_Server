const PhongChieu = require('../model/roomModel');
const phongChieu = new PhongChieu();

class roomController {
    //GET[]/phongchieu
    async getAllPhongChieu(req, res) {
        try {
            const hoTenND = req.session.user[0].hoTen;
            const anhND = req.session.user[0].anh;
            const idNhanVien = req.session.user[0].idNhanVien;

            const listPC = await phongChieu.getPhongChieus();

            const notificationSuccess = req.flash('notificationSuccess');
            const notificationErr = req.flash('notificationErr');

            res.render('others/room', {
                title: 'Phòng Chiếu',
                hoTenND,
                anhND,
                idNhanVien,
                listPC,
                notificationErr,
                notificationSuccess,
            });
        } catch (error) {
            console.error(error);
            req.flash('notificationErr', 'Lỗi xử lý dữ liệu');
            res.redirect('back');
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
module.exports = new roomController()