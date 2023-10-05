
class quanLyKhachHang{
    async goToScreen(req,res){
        res.render('khachHang', { title: 'Khách Hàng' })
    }
    async goToAdd(req,res){
        res.render('themKhachHang', { title: 'Thêm Khách Hàng' })
    }
    async goToList(req,res){
        res.render('khachHang', { title: 'Khách Hàng' })
    }
}
module.exports = new quanLyKhachHang()