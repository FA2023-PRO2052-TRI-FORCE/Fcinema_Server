const connection = require("../../config/connection");

class quanLyPhim{

    async dsPhim(req,res){
        const hoTenND=req.session.user[0].hoTen;
        res.render('movies/phim', { 
            title: 'Phim mới',
            hoTenND:hoTenND })
    }
    // GET[]/phim/phimdachieu
    async dsPhimDaChieu(req,res){
        const hoTenND=req.session.user[0].hoTen;
        const querry=`SELECT t.*, l.tenTheLoai from Phim t, theloai l WHERE t.idTheLoai=l.idTheLoai and trangThai=0`;

        connection.query(querry,(err,results)=>{
            if(err){
                console.error('Lỗi',err.message);
                return;
            }
            res.render('movies/phimDaChieu',{
                title:'Phim đã chiếu',
                hoTenND:hoTenND,
                listDaChieu:results,
            })

        })
    }
    // GET[]/phim/phimdachieu/:idPhim
    async chiTietPhimDaChieu(req,res){
        const idPhim=req.params.idPhim;
        const hoTenND=req.session.user[0].hoTen;
        const querry=`SELECT l.tenTheLoai, p.* from Phim p, TheLoai l where p.idTheLoai=l.idTheLoai and trangThai=0 and idPhim=?`;
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
        const hoTenND=req.session.user[0].hoTen;
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
                hoTenND:hoTenND,
                notificationSuccess,
                notificationErr,
                listDaChieu:resultsRe,
            })
    
            })
        })

    }


    async themPhim(req,res){
        const hoTenND=req.session.user[0].hoTen;

        res.render('movies/themphim', { title: 'Thêm Phim Mới',hoTenND:hoTenND })
    }




}
module.exports=new quanLyPhim();