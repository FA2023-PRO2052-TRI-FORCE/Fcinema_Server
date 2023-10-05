class qlVeDat{
    async dsVeDaDat(req,res){
        res.render('veDat')
    }
    async themVeMoi(req,res){
        res.render('themVeMoi')
    }

}
module.exports=new qlVeDat()