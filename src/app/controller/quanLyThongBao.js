class qlthongBao{
    async dsThongBao(req,res){
        res.render('others/thongBao', { title: 'Thông Báo' })
    }

}
module.exports=new qlthongBao();