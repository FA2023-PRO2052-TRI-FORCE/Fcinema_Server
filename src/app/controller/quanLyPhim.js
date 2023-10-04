
class quanLyPhim{

    async dsPhim(req,res){
        res.render('phim')
    }
    async dsPhimDaChieu(req,res){
        res.render('phimDaChieu')
    }
    async gotoLogin(req,res){
        res.render('login', { layout: 'login' });
    }
    async tongQuan(req,res){
        res.render('dasboard');
    }
    async themPhim(req,res){
        res.render('themphim')
    }



}
module.exports=new quanLyPhim();