const connection = require('../../config/connection');
const upload = require('../../middleware/uploadService');
const fs = require('fs');
const path = require('path');
const defaultImg= path.join(__dirname,'../../resources/upload/cinema_logo_4x.png');

 class doAn{
    // GET[]/doan
    async getAllSanPham(req,res){
        const hoTenND=req.session.user[0].hoTen;
        const anhND=req.session.user[0].anh;
        const notificationSuccess = req.flash('notificationSuccess');
        const notificationErr = req.flash('notificationErr'); 
        const querry=`SELECT * FROM DoAn WHERE hienThi=1`;
        connection.query(querry,(err,results)=>{
            res.render('popcorn/popcorn', { 
                title: 'Đồ ăn',
                hoTenND:hoTenND,
                anhND:anhND,
                listDoAn:results,
                notificationErr:notificationErr,
                notificationSuccess:notificationSuccess })

        })        
    }
    // GET[]doan/idDoAn
    async getSanPhamById(req,res){
        const hoTenND=req.session.user[0].hoTen;
        const anhND=req.session.user[0].anh;
        const idDoAn=req.params.idDoAn;

        const querry=`SELECT * FROM DoAn WHERE idDoAn=?`;
        connection.query(querry,[idDoAn],(err,results)=>{
            res.render('popcorn/updatePopcorn', { 
                title: 'Cập nhật đồ ăn',
                hoTenND:hoTenND,
                anhND:anhND,
                objDoAn:results, 
            })

        })  
    }
    // GET[]doan/them
    async getThemSanPham(req,res){
        const hoTenND=req.session.user[0].hoTen;
        const anhND=req.session.user[0].anh;
        res.render('popcorn/addPopcorn', { 
            title: 'Thêm đồ ăn',
            hoTenND:hoTenND,
            anhND:anhND
        })      
    }
    // PUT[]doan/them/luu
    async addNewSanPham(req,res){
        upload.single("anh")(req, res, async function (err) {
            if (err) {
                console.error("Lỗi khi thêm ảnh: " + err);
              } else {            
                const tenDoAn=req.body.tenDoAn;
                const coSan=req.body.coSan;
                const giaDoAn=req.body.giaDoAn;
                var anhStringBase64;

                if (req.file) {
                    var anh = fs.readFileSync(req.file.path);
                    anhStringBase64 = anh.toString("base64");
                } else {
                    var anhDefault=fs.readFileSync(defaultImg)
                    anhStringBase64 =anhDefault.toString("base64"); 
                }  

                const checkQuerry=`SELECT * FROM DoAn WHERE tenDoAn=?`;
                const insertQuery=`INSERT INTO DoAn (tenDoAn, coSan, giaDoAn, anh, hienThi) VALUES(?, ?, ?, ?, ?)`;
                const insertValues=[tenDoAn,coSan,giaDoAn,anhStringBase64,1];

                connection.query(checkQuerry,[tenDoAn],(checkErr,checkResults)=>{
                    if(checkResults.length>0){
                        req.flash("notificationErr", "Tên đồ ăn đã tồn tại ");
                        res.redirect("/sanpham");                    
                        return;
                    }
                    connection.query(insertQuery,insertValues,(err,results)=>{
                        if(err){
                            console.error('Lỗi',err.message);
                            req.flash("notificationErr", "Lỗi: " + err.message);
                            res.redirect("/sanpham");                    
                            return;
                        }
                        req.flash("notificationSuccess", "Thêm thành công");
                        res.redirect("/sanpham");
                    })
                })


        }
        })
    }    
    // PUT[]doan/capnhat/:idDoAn
    async updateSanPhamById(req,res){
        upload.single("anh")(req, res, async function (err) {
            if (err) {
              console.error('Lỗi', err);
              req.flash("notificationErr", "Lỗi");
              res.redirect('/sanpham');
              return;
            }
            const idDoAn=req.params.idDoAn;
            const tenDoAn=req.body.tenDoAn;
            const coSan=req.body.coSan;
            const giaDoAn=req.body.giaDoAn;
            let anhStringBase64 = null;
            let updateQuery;
            let updateValues;

            if (req.file) {
              var anh = fs.readFileSync(req.file.path);
              anhStringBase64 = anh.toString("base64");

              updateQuery=`UPDATE DoAn SET tenDoAn=?, coSan=?, giaDoAn=?, anh=? WHERE idDoAn=?`;
              updateValues=[tenDoAn,coSan,giaDoAn,anhStringBase64,idDoAn];
            }else{
                updateQuery=`UPDATE DoAn SET tenDoAn=?, coSan=?, giaDoAn=? WHERE idDoAn=?`;
                updateValues=[tenDoAn,coSan,giaDoAn,idDoAn]; 
            }
        

        
            connection.query(updateQuery, updateValues, (err, results) => {
              if (err) {
                console.error('Lỗi', err);
                req.flash("notificationErr", "Lỗi");
                res.redirect('/sanpham');
              } else {
                req.flash("notificationSuccess", "Cập nhật thành công");
                res.redirect('/sanpham');
              }
            });
          });
    }


    // PUT[]doan/xoa/:idDoAn
    async deleteSanPham(req,res){
        let idDoAn=req.params.idDoAn;

        const deleteQuery=`UPDATE DoAn SET hienThi = 0 WHERE idDoAn = ?`;
        connection.query(deleteQuery,[idDoAn],(err, result) => {
            if (err) {
                console.error('Lỗi',err.message);
                req.flash("notificationErr", "Lỗi: " + err.message);
                res.redirect("/sanpham");                    
                return;
            } 

            req.flash('notificationSuccess', 'Xoá thành công');
            res.redirect("/sanpham");

        }
        );        
    }
    
 }
 module.exports=new doAn();