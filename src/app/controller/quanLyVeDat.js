class qlVeDat{
    async dsVeDaDat(req,res){
        res.render('veDat', { title: 'Vé đã đặt' })
    }
    async themVeMoi(req,res){
        res.render('themVeMoi', { title: 'Thêm vé mới' })
    }

}
module.exports=new qlVeDat()