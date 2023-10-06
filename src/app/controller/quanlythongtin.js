
class quanlythongtin{
    async goToManager(req,res){
        res.render('managerAdmin', { title: 'Thông tin tài khoản' })
    }
    async goToChangePass(req,res){
        res.render('changePassAdmin', { title: 'Thay đổi mật khẩu' })
    }
}
module.exports = new quanlythongtin()