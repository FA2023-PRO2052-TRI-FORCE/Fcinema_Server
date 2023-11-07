const connection = require("../../config/connection");

class quanLyKhachHang{
    async goToScreen(req,res){
        const hoTenND=req.session.user[0].hoTen;
        const anhND=req.session.user[0].anh;
        const querry=`SELECT * FROM NguoiDung WHERE hienThi=1`;
        connection.query(querry,(err,results)=>{
            res.render('users/khachHang', { 
                title: 'Khách Hàng',
                hoTenND:hoTenND,
                anhND:anhND,
                listKH:results })

        })
    }
    async goToAdd(req,res){
        const hoTenND=req.session.user[0].hoTen;
        const anhND=req.session.user[0].anh;
        res.render('users/themKhachHang', { 
            title: 'Thêm Khách Hàng',
            anhND:anhND,
            hoTenND:hoTenND })
    }

}
module.exports = new quanLyKhachHang()