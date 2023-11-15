const connection = require("../../config/connection");

class quanLyKhachHang{
    // GET[]/khachhang
    async getListKhachHang(req,res){
        const hoTenND=req.session.user[0].hoTen;
        const anhND=req.session.user[0].anh;
        const querry=`SELECT * FROM NguoiDung`;
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
    // PUT[]khachhang/:email
    async updateTrangThaiKhachHang(req,res){
        const email= req.params.email
        const updateTTKHQuerry='UPDATE NguoiDung SET trangThaiNguoiDung=0, hienThi=0 WHERE email=?';

        connection.query(updateTTKHQuerry,[email],(err,results)=>{
            if (err){
                console.error(err.message);
                req.flash('notificationErr', 'Lỗi');
                res.redirect('back') 
                return;
            }
            req.flash('notificationSuccess', 'Xoá thành công');
            res.redirect('back') 
        })


    }


}
module.exports = new quanLyKhachHang()