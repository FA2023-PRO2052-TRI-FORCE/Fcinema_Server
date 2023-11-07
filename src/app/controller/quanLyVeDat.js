const e = require('express');
const connection=require('../../config/connection');
class qlVeDat{
    // GET[]/ve/dsve
    async getAllVeDaDat(req,res){
      const hoTenND=req.session.user[0].hoTen;
      const anhND=req.session.user[0].anh;      
      const querry=`SELECT v.idVe,p.tenPhim,l.ngayChieu,l.caChieu,t.tenPhongChieu,v.soVe,v.ngayMua,v.tongTien,v.trangThai,g.tenGhe
      FROM ve v JOIN lichchieu l ON v.idLichChieu = l.idLichChieu JOIN phim p ON l.idPhim = p.idPhim JOIN phongchieu t ON l.idPhongChieu = t.idPhongChieu JOIN ViTriGhe g ON g.idVe=v.idVe  ORDER BY v.ngayMua  DESC`;

      connection.query(querry,(err,result)=>{
        if(err) {
            console.log('Lỗi', err.message);
            return;
        }
        const notificationSuccess = req.flash('notificationSuccess');
        const notificationErr = req.flash('notificationErr');        
        res.render('tickets/veDat',{
        title: 'Vé đã đặt',
        hoTenND:hoTenND,
        anhND:anhND,
        listVe : result,
        notificationSuccess,
        notificationErr});
      })
    }
    // GET[]/ve/themve
    async getNewVe(req,res){
      const hoTenND=req.session.user[0].hoTen;
      const anhND=req.session.user[0].anh;


      const querryLichChieu=`SELECT p.tenPhim,q.idPhongChieu,q.tenPhongChieu,l.idLichChieu,l.ngayChieu,l.giaPhim,l.caChieu from lichchieu l 
      JOIN phim p ON l.idPhim=p.idPhim JOIN phongchieu q ON l.idPhongChieu=q.idPhongChieu WHERE l.hienThi=1 `

      const querryGhe=`SELECT g.tenGhe,l.idLichChieu FROM vitrighe g JOIN Ve v ON g.idVe = v.idVe JOIN lichchieu l ON
      l.idLichChieu = v.idLichChieu JOIN phongchieu q ON g.idPhongChieu=q.idPhongChieu WHERE l.idLichChieu=?`;
      connection.query(querryLichChieu, (err, results) => {
        if (err) {
          console.error('Lỗi', err.message);
          return;
        }
    
        const idLichChieus = results.map((row) => row.idLichChieu);
        const gheData = {};
    
        function queryGheForIdLichChieu(index) {
          if (index === idLichChieus.length) {
            res.render('tickets/themVeMoi', {
              title: 'Thêm vé mới',
              hoTenND:hoTenND,
              anhND:anhND,
              listLC: results,
              gheData: gheData,
            });
            return;
          }
    
          const idLichChieu = idLichChieus[index];
          connection.query(querryGhe, [idLichChieu], (err, gheResults) => {
            if (err) {
              console.error('Lỗi', err.message);
            } else {
              gheData[idLichChieu] = gheResults;
            }
    
            queryGheForIdLichChieu(index + 1);
          });
        }
     
    
        queryGheForIdLichChieu(0);
      });
    }
    // GET[]/ve/them/ghedachon
    async getAllGheDaChon(req,res){
      const querryGhe=`SELECT g.tenGhe,l.idLichChieu FROM vitrighe g JOIN Ve v ON g.idVe = v.idVe JOIN lichchieu l ON
      l.idLichChieu = v.idLichChieu JOIN phongchieu q ON g.idPhongChieu=q.idPhongChieu`;      
      connection.query(querryGhe,(err,result)=>{
        
        res.send(result);
      })
    }
    
    // POST[]/ve/them/luu
    async addNewVe(req,res){
      const idVe=req.body.idVe;
      const idLichChieu=req.body.idLichChieu;
      const tongTien=req.body.tongTien;
      const tenGhe=req.body.tenGhe;
      const trangThai=1;
      const phuongThucTT=req.body.phuongThucTT;
      const ngayMua=new Date;
      const arrayOfTenGhe = tenGhe.split(', ');
      const soVe = arrayOfTenGhe.length;
      const idPhongChieu=req.body.idPhongChieu;
      const idNhanVien =req.session.user[0].idNhanVien;


      const insertVeQuerry=`INSERT INTO VE (idVe,soVe,ngayMua,tongTien,trangThai,phuongThucTT,email,idNhanVien,idLichChieu)
      VALUES(?,?,?,?,?,?,?,?,?)`;
      const insertValues=[idVe,soVe,ngayMua,tongTien,trangThai,phuongThucTT,null,idNhanVien,idLichChieu]

      connection.query(insertVeQuerry,insertValues,(errVe,resultsVe)=>{
        if(errVe){
          console.error('Lỗi',errVe.message);
          return;
        }
        const insertVTGQuerry=`INSERT INTO ViTriGhe (tenGhe,trangThai,idPhongChieu,idVe) VALUES(?,?,?,?)`;
        const insertVTGValues=[JSON.stringify(tenGhe),1,idPhongChieu,idVe];

        connection.query(insertVTGQuerry,insertVTGValues,(errVTG,resultsVTG)=>{
          if(errVTG){
            console.error('Lỗi',errVTG.message);
            return;
          }
          req.flash('notificationSuccess', 'Thêm lịch vé thành công');
          res.redirect('/ve')


        })
      })


    }
    // GET[]/ve/chitet
    async getChiTetVe(req,res){
      const hoTenND=req.session.user[0].hoTen;
      const anhND=req.session.user[0].anh;
      const idVe=req.params.idVe;
      const querry=`SELECT v.idVe,p.tenPhim,l.ngayChieu,l.caChieu,t.tenPhongChieu,v.*,g.tenGhe
      FROM ve v JOIN lichchieu l ON v.idLichChieu = l.idLichChieu JOIN phim p ON l.idPhim = p.idPhim JOIN phongchieu t ON l.idPhongChieu = t.idPhongChieu JOIN ViTriGhe g ON g.idVe=v.idVe  WHERE v.idVe=?`;
      
      connection.query(querry,[idVe],(err,results)=>{
        if(err){
          console.error('Lỗi',err.message);
          return;
        }
        const objVe=JSON.parse(JSON.stringify(results));
        console.log(typeof results);
        console.log(typeof JSON.stringify(results));
        console.log(typeof objVe);


        res.render('tickets/chiTietVe',{
          title:'Chi tiết vé đặt',
          hoTenND:hoTenND,
          anhND:anhND,
          objectVe:objVe})
      })

    }

}
module.exports=new qlVeDat()