const connection = require("../../config/connection");

class quanLyPhongChieu{
    //GET[]/phongchieu
    async getAllPhongChieu(req,res){
        const hoTenND=req.session.user[0].hoTen;
        const anhND=req.session.user[0].anh;
        const querry=`SELECT * FROM PhongChieu`;
        const notificationSuccess = req.flash('notificationSuccess');
        const notificationErr = req.flash('notificationErr'); 
        connection.query(querry,(err,results)=>{
            res.render('others/phongChieu', { 
                title: 'Phòng Chiếu',
                hoTenND:hoTenND,
                anhND:anhND,
                listPC:results,
                notificationErr,
                notificationSuccess
         })
        }) 
    }
    // PUT[]/phongchieu/:idPhongChieu
    async updatePhongChieu(req,res){
        const idPhongChieu=req.params.idPhongChieu;
        const trangThai=req.body.trangThai;
        
        let updateTrangThaiQuerry=[];

        if(trangThai==0){
            updateTrangThaiQuerry=`UPDATE PhongChieu SET trangThai=1 WHERE idPhongChieu=?`;
        }else{
            updateTrangThaiQuerry=`UPDATE PhongChieu SET trangThai=0 WHERE idPhongChieu=?`;

        }

        connection.query(updateTrangThaiQuerry,[idPhongChieu],(err,results)=>{
            if(err){
                req.flash('notificationErr','Lỗi');
                res.redirect("back");
                return;
            }
            req.flash('notificationSuccess','Reset thành công');
            res.redirect("back");
        })
    }
}
module.exports = new quanLyPhongChieu()