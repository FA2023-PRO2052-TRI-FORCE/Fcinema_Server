const connection = require("../../config/connection");

class quanLyPhongChieu{
    async goToQLPC(req,res){
        const hoTenND=req.session.user[0].hoTen;

        const querry=`SELECT * FROM PhongChieu`;
        connection.query(querry,(err,results)=>{
            res.render('others/phongChieu', { 
                title: 'Phòng Chiếu',
                hoTenND:hoTenND,
                listPC:results })

        })
        
    }
}
module.exports = new quanLyPhongChieu()