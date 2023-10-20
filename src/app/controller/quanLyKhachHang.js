const connection = require("../../config/connection");

class quanLyKhachHang{
    async goToScreen(req,res){
        const hoTenND=req.session.user[0].hoTen;
        const querry=`SELECT * FROM NguoiDung WHERE hienThi=1`;
        connection.query(querry,(err,results)=>{
            res.render('users/khachHang', { 
                title: 'Khách Hàng',
                hoTenND:hoTenND,
                listKH:results })

        })
    }
    async goToAdd(req,res){
        const hoTenND=req.session.user[0].hoTen;
        res.render('users/themKhachHang', { 
            title: 'Thêm Khách Hàng',
            hoTenND:hoTenND })
    }

}
module.exports = new quanLyKhachHang()