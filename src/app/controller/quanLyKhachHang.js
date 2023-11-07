const connection = require("../../config/connection");

class quanLyKhachHang{
    // GET[]/khachhang
    async getAllKhachHang(req,res){
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
    // GET[]/khachhang/:email
    async getKhachHangByEmail(req,res){
        const hoTenND=req.session.user[0].hoTen;
        const anhND=req.session.user[0].anh;        
        const email= req.params.email;

        const querryKH=`SELECT * FROM NguoiDung WHERE email=?`;
        connection.query(querryKH,[email],(err,results)=>{
            if (err){
                console.error(err);
                return;
            }

            res.render('users/detailKH',{
                title:"Chi tiết khách hàng",
                hoTenND:hoTenND,
                anhND:anhND,
                listKH:results
            })


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