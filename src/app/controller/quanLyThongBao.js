class qlthongBao{
    async dsThongBao(req,res){
        res.render('thongBao', { title: 'Thông Báo' })
    }

}
module.exports=new qlthongBao();