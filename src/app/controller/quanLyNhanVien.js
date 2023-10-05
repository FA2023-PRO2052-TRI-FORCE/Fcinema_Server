
class qlNhanVien{
    async goToScreen(req,res){
        res.render('nhanVien')
    }
    async goToAdd(req,res){
        res.render('themNhanVien')
    }

}
module.exports = new qlNhanVien();