class qlLoaiPhim{

    async dsLoaiPhim(req,res){
        res.render('movies/loaiPhim', { title: 'Loại Phim' });
    }
    async themLoaiPhim(req,res){
        res.render('movies/themLoaiPhim', { title: 'Thêm Loại Phim' });
    }    

}
module.exports=new qlLoaiPhim();