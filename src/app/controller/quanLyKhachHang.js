
class quanLyKhachHang{
    async goToScreen(req,res){
        res.render('khachHang')
    }
    async goToAdd(req,res){
        res.render('themKhachHang')
    }
    async goToList(req,res){
        res.render('khachHang')
    }
}
module.exports = new quanLyKhachHang()