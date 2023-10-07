
class quanLyKhachHang{
    async goToScreen(req,res){
        res.render('others/phongChieu', { title: 'Phòng Chiếu' })
    }
    async goToAdd(req,res){
        res.render('users/themKhachHang')
    }
    async goToList(req,res){
        res.render('users/khachHang')
    }
}
module.exports = new quanLyKhachHang()