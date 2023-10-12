const connection = require("../../config/connection");

class quanLyPhim{

    async dsPhim(req,res){
        res.render('movies/phim', { title: 'Phim mới' })
    }
    // GET[]/phim/phimdachieu
    async dsPhimDaChieu(req,res){
        const querry=`SELECT t.*, l.tenTheLoai from Phim t, theloai l WHERE t.idTheLoai=l.idTheLoai and trangThai=2`;
        connection.query(querry,(err,results)=>{
            if(err){
                console.error('Lỗi',err.message);
                return;
            }
            res.render('movies/phimDaChieu',{
                title:'Phim đã chiếu',
                listDaChieu:results,
            })

        })
    }
    // GET[]/phim/phimdachieu/:idPhim
    async chiTietPhimDaChieu(req,res){
        const idPhim=req.params.idPhim;
        const querry=`SELECT l.tenTheLoai, p.* from Phim p, TheLoai l where p.idTheLoai=l.idTheLoai and trangThai=2 and idPhim=?`;
        connection.query(querry,[idPhim],(err,results)=>{
            if(err){
                console.error('Lỗi',err.message);
                return;
            }
            res.send(results);
        })
    }
    // PUT[]/quanlyphim/phimdachieu/:idPhim
    async xoaPhimDaChieu(req,res){
        let notificationErr=[];
        let notificationSuccess=[];
        const idPhim=req.params.idPhim;
        const updateQuerry=`UPDATE PHIM SET hienThi=0 WHERE idPhim=?`;
        connection.query(updateQuerry,[idPhim],(err,results)=>{
            if (err){
                console.error('Lỗi',err.message);
                notificationErr.push({err:err.message});
                return;
            }
            notificationSuccess.push({success:'Lưu trữ thành công'})

            const querry=`SELECT t.*, l.tenTheLoai from Phim t, theloai l WHERE t.idTheLoai=l.idTheLoai and trangThai=2`;
            connection.query(querry,(errRe,resultsRe)=>{
                if(errRe){
                    console.error('Lỗi',errRe.message);
                    return;
                }
                res.render('movies/phimDaChieu',{
                title:'Phim đã chiếu',
                notificationSuccess,
                notificationErr,
                listDaChieu:resultsRe,
            })
    
            })
        })

    }

    // GET[]/login
    async gotoLogin(req,res){
        
        res.render('account/login', { layout: 'login' });
    }
    // GET[]/tongquan
    async tongQuan(req,res){
        const querry=`UPDATE LichChieu SET hienThi=0  WHERE ngayChieu<= CURRENT_DATE `;
        connection.query(querry,(err,results)=>{
            if(err){
                console.error('Lỗi',err.message);
                return;
            }
            const querryP=`UPDATE Phim SET trangThai=0 WHERE idPhim IN(SELECT l.idPhim FROM LichChieu l WHERE l.ngayChieu<=CURRENT_DATE)`;
            connection.query(querryP,(err,result)=>{
                if(err){
                    console.error('Lỗi',err.message);
                    return;
                }
                res.render('account/dasboard', { title: 'Tổng Quan' });
            })

        })
    }
    async themPhim(req,res){
        res.render('movies/themphim', { title: 'Thêm Phim Mới' })
    }




}
module.exports=new quanLyPhim();