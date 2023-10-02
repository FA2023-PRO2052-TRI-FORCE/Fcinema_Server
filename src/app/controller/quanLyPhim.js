
class quanLyPhim{

    async getDSPhim(req,res){
        res.render('phim')
    }
    async gotoLogin(req,res){
        res.render('login', { layout: 'login' });
    }
    async goToTQ(req,res){
        res.render('dasboard');
    }



}
module.exports=new quanLyPhim();