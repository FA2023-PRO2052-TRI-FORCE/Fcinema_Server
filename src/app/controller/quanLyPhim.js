
class quanLyPhim{

    async dsPhim(req,res){
        res.render('phim', { title: 'Phim mới' })
    }
    async dsPhimDaChieu(req,res){
        res.render('phimDaChieu', { title: 'Phim Đã Chiếu' })
    }
    async gotoLogin(req,res){
        res.render('login', { layout: 'login' });
    }
    async tongQuan(req,res){
        res.render('dasboard', { title: 'Tổng Quan' });
    }
    async themPhim(req,res){
        res.render('themphim', { title: 'Thêm Phim Mới' })
    }



}
module.exports=new quanLyPhim();