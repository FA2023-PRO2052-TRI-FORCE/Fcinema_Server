const e = require('express');
const connection=require('../../config/connection');

let dsPhim=[];
let dsPC=[];
class lichChieu{
    // GET[]/lichchieu
    async getAllLichChieu(req,res){
        const hoTenND=req.session.user[0].hoTen;

        const selectedQuerry=`SELECT p.tenPhim,p.anh,p.thoiLuong,t.idLichChieu,t.ngayChieu,t.caChieu,t.giaPhim,t.ngayThem, c.tenPhongChieu FROM lichchieu t, Phim p , phongchieu c
        WHERE t.idPhim=p.idPhim and t.idPhongChieu=c.idPhongChieu and t.hienThi=1 ORDER BY t.ngayChieu ASC`;
        
        connection.query(selectedQuerry,(err,result)=>{
            if(err){
                console.error('Lỗi lấy tất cả ds lịch chiêu',err.message);
                return;
            }
            const notificationSuccess = req.flash('notificationSuccess');
            const notificationErr = req.flash('notificationErr');
            res.render('showtimes/lichChieu', { 
                title: 'Lịch Chiếu Phim' ,
                hoTenND:hoTenND,
                listLC:result,
                notificationErr,
                notificationSuccess
            })

        })
        
    }
    // POST[]/lichchieu/tim/:tenPhim
    async searchLichChieu(req,res){
        try{
        const tenPhimSearch=req.body["tenPhimSearch"];
        const hoTenND=req.session.user[0].hoTen;
        const selectedQuerry=`SELECT p.tenPhim,p.anh,p.thoiLuong,t.idLichChieu,t.ngayChieu,t.caChieu,t.giaPhim,t.ngayThem, c.tenPhongChieu FROM lichchieu t, Phim p , phongchieu c
        WHERE t.idPhim=p.idPhim and t.idPhongChieu=c.idPhongChieu and t.hienThi=1 and p.tenPhim=?`
        connection.query(selectedQuerry,[tenPhimSearch],(err,results)=>{
            if(err){
                console.error('Lỗi', err.message);
                return
            }
            if(results.length==0){
                req.flash('notificationErr', 'Không tìm thấy phim');
                res.redirect('/lichchieu')
            }
            res.render('showtimes/lichchieu',{
                title:'Danh sách phim',
                hoTenND:hoTenND,
                listLC: results,
            })
        })
        }catch(err){
            console.log('Lỗi',err.message);

        }
    
    }

    // GET[]/lichchieu/them
    async getNewLichChieu(req,res){
        try {
            const hoTenND=req.session.user[0].hoTen;
            const queryPhim = 'SELECT * FROM Phim WHERE hienThi=1';
            const queryPC = 'SELECT * FROM PhongChieu WHERE trangThai=1';
    
            connection.query(queryPhim,(err,resultsPhim)=>{

                dsPhim=resultsPhim;
                connection.query(queryPC,(err,resultPC)=>{
                    dsPC=resultPC;
                    res.render('showtimes/themLichChieu', {
                        title: 'Thêm Lịch Chiếu Phim',
                        hoTenND:hoTenND,
                        listPhim: dsPhim,
                        listPC: dsPC
                    });
                })
            })
            
        } catch (err) {
            console.error('Lỗi', err.message);
        }
                
    }
    // POST[]/lichchieu/them/luu
    async addNewLichChieu(req, res) {  
        let notificationErr=[];
        const hoTenND=req.session.user[0].hoTen;
        const ngayChieu = req.body.ngayChieu;
        const caChieu = req.body.caChieu;
        const giaPhim = req.body.giaPhim;
        const idPhongChieu = req.body.idPhongChieu;
        const idPhim = req.body.idPhim;
        
        const checkQuerry=`SELECT COUNT(*) AS count FROM lichchieu WHERE caChieu=? and ngayChieu=? and idPhongChieu=?`;
        const checkValues=[caChieu,ngayChieu,idPhongChieu];

        connection.query(checkQuerry,checkValues,(errCheck,checkResult)=>{
            if(checkResult[0].count>0){
                notificationErr.push({err:'Ca chiếu trong ngày này đã có lịch chiếu'});
                res.render('showtimes/themLichChieu', {
                    title: 'Thêm Lịch Chiếu Phim',
                    listPhim:dsPhim,
                    listPC:dsPC,
                    hoTenND:hoTenND,
                    notificationErr:notificationErr,
                    ngayChieu: req.body.ngayChieu,
                    caChieu: req.body.caChieu,
                    giaPhim: req.body.giaPhim,
                    idPhongChieu: parseFloat(req.body.idPhongChieu),
                    idPhim:parseFloat(req.body.idPhim),
                });              

            }else{
            
                const insertQuery = `INSERT INTO LichChieu (ngayChieu, caChieu, giaPhim, ngayThem, hienThi, idPhongChieu, idPhim)
                VALUES (?, ?, ?, ?, ?, ?, ?)`;

                const insertValues = [ngayChieu,caChieu,giaPhim,new Date(),1, idPhongChieu,idPhim];                
            
                connection.query(insertQuery, insertValues, (err, results) => {
                    if (err) {
                        console.error('Lỗi', err.message);
                        notificationErr.push({err: err.message});
                        res.render('showtimes/themLichChieu', {
                            title: 'Thêm Lịch Chiếu Phim',
                            listPhim:dsPhim,
                            listPC:dsPC,
                            hoTenND:hoTenND,
                            notificationErr:notificationErr,
                            ngayChieu: req.body.ngayChieu,
                            caChieu: req.body.caChieu,
                            giaPhim: req.body.giaPhim,
                            idPhongChieu: parseFloat(req.body.idPhongChieu),
                            idPhim:parseFloat(req.body.idPhim),
                            
                        }); 
                    } else {
                        req.flash('notificationSuccess', 'Thêm lịch chiếu thành công');
                        res.redirect('/lichchieu');                                             
                               
                     }
                     const updateQuerry=`UPDATE Phim SET trangThai=2 WHERE idPhim=?`;
                     const idPhim=[req.body.idPhim];
                     connection.query(updateQuerry,[idPhim],(errUpdate,updateResults)=>{
                        if(errUpdate){
                            console.error('Lỗi update trạng thái phim',errUpdate.message)
                            return;
                        }
                        console.log('Cập nhật trạng thái phim thành công')
                     })

                });

            }
        })
    }

    // GET[]/lichchieu/sua/:idLichChieu
    async getChiTietLichChieu(req,res){
        try{
            const hoTenND=req.session.user[0].hoTen;
            const idLichChieu=req.params.idLichChieu;
            const selectedQuerry=`SELECT p.tenPhim,t.idLichChieu,t.ngayChieu,t.caChieu,t.giaPhim,t.ngayThem, c.tenPhongChieu FROM lichchieu t, Phim p , phongchieu c
            WHERE t.idPhim=p.idPhim and t.idPhongChieu=c.idPhongChieu and t.idLichChieu=?`;
            connection.query(selectedQuerry,[idLichChieu],(err,results)=>{
                if(err){
                    console.error('Lỗi',err.message);
                    return;
                }
                const objLC=JSON.parse(JSON.stringify(results));
                res.render('showtimes/suaLichChieu', {
                    title: 'Sửa Lịch Chiếu Phim',
                    hoTenND:hoTenND,
                    objectLichChhieu: objLC,
                    
                }); 
      
            })

        }catch(err){

        }
    }
    // PUT/lichchieu/sua/:idLichChieu
    async updateLichChieu(req,res){
        const giaPhim = req.body.giaPhim;
        const idLichChieu = req.params.idLichChieu;

        const updateQuerry=`UPDATE LichChieu SET giaPhim=? WHERE idLichChieu=?`
        connection.query(updateQuerry,[giaPhim,idLichChieu],(err,results)=>{
            if (err) {
                console.error('Lỗi', err.message);
                return;
            }
            req.flash('notificationSuccess', 'Cập nhật lịch chiếu thành công');
            res.redirect('/lichchieu');
      
        })

    }
    // PUT[]/lichchieu/luutru
    async deleteLichChieu(req,res){ 
        const idLichChieu=req.params.idLichChieu;
        const updateQuerry=`UPDATE LichChieu SET hienThi=0 WHERE idLichChieu=?`;
        connection.query(updateQuerry,[idLichChieu],(err,results)=>{
            if(err){
                console.error('Lỗi update trạng thái phim',err.message)
                return;
            }
            req.flash('notificationSuccess', 'Xoá lịch chiếu thành công');
            res.redirect('/lichChieu')
         })


    }

}
module.exports=new lichChieu();