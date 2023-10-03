
class quanlythongtin{
    async goToManager(req,res){
        res.render('managerAdmin')
    }
    async goToChangePass(req,res){
        res.render('changePassAdmin')
    }
}
module.exports = new quanlythongtin()