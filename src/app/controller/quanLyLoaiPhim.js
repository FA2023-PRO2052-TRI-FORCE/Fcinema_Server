class qlLoaiPhim{

    async dsLoaiPhim(req,res){
        res.render('loaiPhim');
    }
    async themLoaiPhim(req,res){
        res.render('themLoaiPhim');
    }    

}
module.exports=new qlLoaiPhim();