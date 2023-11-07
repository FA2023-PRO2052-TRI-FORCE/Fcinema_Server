const connection = require("../../config/connection");

class quanLyPhongChieu{
    async goToQLPC(req,res){
        const hoTenND=req.session.user[0].hoTen;
        const anhND=req.session.user[0].anh;
        const querry=`SELECT * FROM PhongChieu`;
        connection.query(querry,(err,results)=>{
            res.render('others/phongChieu', { 
                title: 'Phòng Chiếu',
                hoTenND:hoTenND,
                anhND:anhND,
                listPC:results })

        })
        
    }
}
module.exports = new quanLyPhongChieu()