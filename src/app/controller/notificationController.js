class notify{
    async getNotify(req,res){
        res.render('others/thongBao', { title: 'Thông Báo' })
    }

}
module.exports=new notify();