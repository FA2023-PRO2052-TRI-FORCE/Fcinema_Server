class lichChieu{
    async dsLichChieu(req,res){
        res.render('lichChieu')
    }
    async themLichChieu(req,res){
        res.render('themLichChieu')
    }

}
module.exports=new lichChieu();