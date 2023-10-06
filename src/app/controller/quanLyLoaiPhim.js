class qlLoaiPhim{

    async dsLoaiPhim(req,res){
        res.render('loaiPhim', { title: 'Loại Phim' });
    }
    async themLoaiPhim(req,res){
        res.render('themLoaiPhim', { title: 'Thêm Loại Phim' });
    }    

}
module.exports=new qlLoaiPhim();