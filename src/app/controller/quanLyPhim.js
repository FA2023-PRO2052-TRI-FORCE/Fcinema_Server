
class quanLyPhim{

    async dsPhim(req,res){
        res.render('movies/phim', { title: 'Phim mới' })
    }
    async dsPhimDaChieu(req,res){
        res.render('movies/phimDaChieu', { title: 'Phim Đã Chiếu' })
    }
    async gotoLogin(req,res){
        res.render('account/login', { layout: 'login' });
    }
    async tongQuan(req,res){
        res.render('account/dasboard', { title: 'Tổng Quan' });
    }
    async themPhim(req,res){
        res.render('movies/themphim', { title: 'Thêm Phim Mới' })
    }



}
module.exports=new quanLyPhim();