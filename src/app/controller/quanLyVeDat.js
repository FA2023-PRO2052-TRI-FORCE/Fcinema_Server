const e = require('express');
const connection=require('../../config/connection');
class qlVeDat{
    // GET[]/ve/dsve
    async getAllVeDaDat(req,res){
      const hoTenND=req.session.user[0].hoTen;
      const anhND=req.session.user[0].anh; 
      const notificationSuccess = req.flash('notificationSuccess');
      const notificationErr = req.flash('notificationErr');       
      const querry=`SELECT v.idVe,p.tenPhim,l.ngayChieu,l.caChieu,t.tenPhongChieu,v.soVe,v.ngayMua,v.tongTien,v.trangThai,g.tenGhe
      FROM ve v JOIN lichchieu l ON v.idLichChieu = l.idLichChieu JOIN phim p ON l.idPhim = p.idPhim JOIN phongchieu t ON l.idPhongChieu = t.idPhongChieu JOIN ViTriGhe g ON g.idVe=v.idVe  ORDER BY l.ngayChieu DESC`;

      connection.query(querry,(err,result)=>{
        if(err) {
            console.log('Lỗi', err.message);
            return;
        }
      
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
      const notificationSuccess = req.flash('notificationSuccess');
      const notificationErr = req.flash('notificationErr');   
      const querryLichChieu=`SELECT p.anh, p.tenPhim, q.idPhongChieu, q.tenPhongChieu,l.idLichChieu, l.ngayChieu, l.caChieu, MAX(l.giaPhim) AS giaPhim, GROUP_CONCAT(g.tenGhe) AS tenGhe    
      FROM
          lichchieu l
          JOIN phim p ON l.idPhim = p.idPhim
          JOIN phongchieu q ON l.idPhongChieu = q.idPhongChieu    
          LEFT JOIN ve v ON l.idLichChieu = v.idLichChieu
          LEFT JOIN vitrighe g ON g.idVe = v.idVe
      WHERE
          l.hienThi = 1
      GROUP BY
          q.idPhongChieu,
          q.tenPhongChieu,
          l.ngayChieu,
          l.caChieu,
          l.idLichChieu`;

      const querrySanPham=`SELECT * FROM DoAn WHERE hienThi=1`;
      let listDoAn;
      connection.query(querrySanPham,(errSp,resultsSp)=>{
          listDoAn=resultsSp;
      })
      connection.query(querryLichChieu, (err, results) => {
        if (err) {
          console.error('Lỗi', err.message);
          return;
        }
        
        res.render('tickets/themVeMoi', {
        title: 'Thêm vé mới',
        hoTenND:hoTenND,
        anhND:anhND,
        listLC: results,
        listDoAn:listDoAn,
        notificationSuccess,
        notificationErr
      });

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
      const trangThai=0;
      const phuongThucTT=req.body.phuongThucTT;
      const ngayMua=new Date;
      const arrayOfTenGhe = tenGhe.split(', ');
      const soVe = arrayOfTenGhe.length;
      const idPhongChieu=req.body.idPhongChieu;
      const idNhanVien =req.session.user[0].idNhanVien;
      const idDoAn=req.body.idDoAn;
      const soLuongChon=req.body.soLuong;
      const coSan=req.body.coSan;
      const  insertCTDAValues=[];
      const insertVeQuerry=`INSERT INTO VE (idVe,soVe,ngayMua,tongTien,trangThai,phuongThucTT,email,idNhanVien,idLichChieu)
      VALUES(?,?,?,?,?,?,?,?,?)`;
      const insertValues=[idVe,soVe,ngayMua,tongTien,trangThai,phuongThucTT,null,idNhanVien,idLichChieu]
      const insertVTGQuerry=`INSERT INTO ViTriGhe (tenGhe,trangThai,idPhongChieu,idVe) VALUES(?,?,?,?)`;
      const insertVTGValues=[JSON.stringify(tenGhe),1,idPhongChieu,idVe];
      const insertCTDAQuerry = `INSERT INTO ChiTietDoAn (soLuong, idDoAn, idVe) VALUES ?`;
      const updateDAQuerry=`UPDATE DoAn SET coSan=? WHERE idDoAn=?`
      let updateDAValues=[];
      let coSanUpDate;



      for (let i = 0; i < soLuongChon.length; i++) {
        const soLuong = Array.from(soLuongChon[i]);
      
        if (soLuong[0] && soLuong.some(value => parseInt(value) > 0)) {
          const resultArray = [
            JSON.parse(soLuong[0]), 
            Number(idDoAn[i]),
            idVe
          ];
      
          insertCTDAValues.push(resultArray);
        }
      }

      if (idPhongChieu == null || idPhongChieu === "") {
        req.flash("notificationErr", "Chưa chọn phim");
        return res.redirect("/ve/them");
      }

      if (tenGhe == null || tenGhe === "") {
        req.flash("notificationErr", "Chưa chọn ghế");
        return res.redirect("/ve/them");
      }
      console.log('SL',soLuongChon);

      if(soLuongChon.length === 0 || soLuongChon == null || (Array.isArray(soLuongChon) && soLuongChon.every(item => item === ''))){
        connection.query(insertVeQuerry,insertValues,(errVe,resultsVe)=>{
          if(errVe){
            console.error('Lỗi thêm vé',errVe.message);
              req.flash('notificationErr', 'Lỗi');
              res.redirect('/ve')          
            return;
          }
  
          connection.query(insertVTGQuerry,insertVTGValues,(errVTG,resultsVTG)=>{
            if(errVTG){
              console.error('Lỗi ghế',errVTG.message);
              req.flash('notificationErr', 'Lỗi');
              res.redirect('/ve')                 
              return;
            }
            req.flash('notificationSuccess', 'Thêm vé thành công');
            res.redirect('/ve')
            return;
          })
        })
      }else{  
      connection.query(insertVeQuerry,insertValues,(errVe,resultsVe)=>{
        if(errVe){
          console.error('Lỗi thêm vé',errVe.message);
            req.flash('notificationErr', 'Lỗi');
            res.redirect('/ve')          
          return;
        }

        connection.query(insertVTGQuerry,insertVTGValues,(errVTG,resultsVTG)=>{
          if(errVTG){
            console.error('Lỗi ghế',errVTG.message);
            req.flash('notificationErr', 'Lỗi');
            res.redirect('/ve')                 
            return;
          }

          connection.query(insertCTDAQuerry, [insertCTDAValues],(errCTDA,resultsCTDA)=>{
            if(errCTDA){
              console.error('Lỗi CTDA',errCTDA.message);
              req.flash('notificationErr', 'Lỗi');
              res.redirect('/ve')                   
              return;
            }
            req.flash('notificationSuccess', 'Thêm vé thành công');
            res.redirect('/ve')

          })

        })
      })         
      
    }

 


    }
    // GET[]/ve/chitet
    async getChiTetVe(req,res){
      const hoTenND=req.session.user[0].hoTen;
      const anhND=req.session.user[0].anh;
      const idVe=req.params.idVe;

      const querryVe=`SELECT p.*,l.ngayChieu,l.caChieu,t.tenPhongChieu,v.*,g.tenGhe
      FROM ve v JOIN lichchieu l ON v.idLichChieu = l.idLichChieu JOIN phim p ON l.idPhim = p.idPhim JOIN phongchieu t ON l.idPhongChieu = t.idPhongChieu JOIN ViTriGhe g ON g.idVe=v.idVe WHERE v.idVe=?`;

      const querryCTDA=`SELECT c.soLuong, a.* FROM chitietdoan c JOIN Ve v ON v.idVe=c.idVe JOIN DoAn a ON a.idDoAn=c.idDoAn WHERE v.idVe=?`;
      let listDoAn=[];
      connection.query(querryCTDA,[idVe],(errCTDA,resultsCTDA)=>{
        if (errCTDA){
          console.error('Lỗi',errCTDA.message);
        }
        listDoAn=resultsCTDA;

      })
      connection.query(querryVe,[idVe],(err,results)=>{
        if(err){
          console.error('Lỗi',err.message);
          return;
        }

        res.render('tickets/chiTietVe',{
          title:'Chi tiết vé đặt',
          hoTenND:hoTenND,
          anhND:anhND,
          objectVe:results,
          listDoAn:listDoAn
        })
      })

    }

    // PUT[]ve/chitiet/:idVe
    async updateTrangThaiVe(req,res){
      const idVe=req.params.idVe;
      const trangThai=req.body.trangThai;

      const updateTTQuerry=`UPDATE Ve SET trangThai=? WHERE idVe=?`;
      const updateTTValues=[trangThai,idVe];

      connection.query(updateTTQuerry,updateTTValues,(err,results)=>{
        if(err) {
          console.error('lỗi',err.message)
          req.flash('notificationErr', 'Lỗi');
          res.redirect('back')
        }
        req.flash('notificationSuccess', 'Cập nhật trạng thái thành công');
        res.redirect('back')
      })

    }
}
module.exports=new qlVeDat()