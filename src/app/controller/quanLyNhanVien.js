
class qlNhanVien{
    async goToScreen(req,res){
        res.render('nhanVien', { title: 'Nhân Viên' })
    }
    async goToAdd(req,res){
        res.render('themNhanVien', { title: 'Thêm Nhân Viên' })
    }

}
module.exports = new qlNhanVien();