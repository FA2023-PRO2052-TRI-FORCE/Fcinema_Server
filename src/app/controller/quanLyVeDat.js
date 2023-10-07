class qlVeDat{
    async dsVeDaDat(req,res){
        res.render('tickets/veDat', { title: 'Vé đã đặt' })
    }
    async themVeMoi(req,res){
        res.render('tickets/themVeMoi', { title: 'Thêm vé mới' })
    }

}
module.exports=new qlVeDat()