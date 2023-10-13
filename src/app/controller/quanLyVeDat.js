const { query } = require('express');
const connection=require('../../config/connection');
class qlVeDat{
    // GET[]/ve/dsve
    async getAllVeDaDat(req,res){
        const querry=`  
        SELECT
        v.idVe,
        p.tenPhim,
        l.ngayChieu,
        l.caChieu,
        t.tenPhongChieu,
        v.soVe,
        v.ngayMua,
        v.tongTien,
        v.trangThai
      FROM ve v
      JOIN lichchieu l ON v.idLichChieu = l.idLichChieu
      JOIN phim p ON l.idPhim = p.idPhim
      JOIN phongchieu t ON l.idPhongChieu = t.idPhongChieu`;

      connection.query(querry,(err,result)=>{
        if(err) {
            console.log('Lỗi', err.message);
            return;
        }
        res.render('tickets/veDat',{title: 'Vé đã đặt',listVe : result});
      })
    }
    async addNewVe(req,res){
        res.render('tickets/themVeMoi', { title: 'Thêm vé mới' })
    }

}
module.exports=new qlVeDat()