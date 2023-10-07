
class quanLyKhachHang{
    async goToScreen(req,res){
        res.render('users/khachHang', { title: 'Khách Hàng' })
    }
    async goToAdd(req,res){
        res.render('users/themKhachHang', { title: 'Thêm Khách Hàng' })
    }
    async goToList(req,res){
        res.render('users/khachHang', { title: 'Khách Hàng' })
    }
}
module.exports = new quanLyKhachHang()