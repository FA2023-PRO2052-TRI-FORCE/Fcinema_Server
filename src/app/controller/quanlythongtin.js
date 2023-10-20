const connection=require('../../config/connection')
class quanlythongtin{
    async goToManager(req,res){
        const hoTenND=req.session.user[0].hoTen;
        res.render('account/managerAdmin', { 
            title: 'Thông tin tài khoản',
        hoTenND:hoTenND })
    }
    // GET[]/changepass
    async goToChangePass(req,res){
        const matKhau=req.session.user[0].matKhau;
        const idNhanVien=req.session.user[0].idNhanVien;
        const hoTenND=req.session.user[0].hoTen;
        const notificationSuccess = req.flash('notificationSuccess');
        const notificationErr = req.flash('notificationErr');        
        res.render('account/changePassAdmin', { title: 'Thay đổi mật khẩu',
        hoTenND:hoTenND,
        matKhau:matKhau,
        idNhanVien:idNhanVien,
        notificationErr
        ,notificationSuccess })
    }
    // PUT[]/changepass
    async changePasswordUser(req,res){
        const idNhanVien=req.session.user[0].idNhanVien; 
        const oldMatKhau=req.session.user[0].matKhau; 
        const matKhau=req.body.matKhau;
        const newMatKhau=req.body.newMatKhau;
        const comfirmMatKhau=req.body.comfirmMatKhau;
        const updateQuerry =`UPDATE NhanVien SET matKhau=? WHERE idNhanVien=?`;  
        connection.query(updateQuerry,[newMatKhau,idNhanVien],(err,results)=>{
            if(err) {
                req.flash('notificationErr', 'Không tìm thấy phim');
                res.redirect('/changePassAdmin');
                return;
            }
            if(matKhau !=oldMatKhau){
                req.flash('notificationErr', 'Mật khẩu cũ không đúng');
                res.redirect('/changePassAdmin');
                return;                
            }
            if(newMatKhau !=comfirmMatKhau){
                req.flash('notificationErr', 'Xác nhận mật khẩu mới không trùng');
                res.redirect('/changePassAdmin');
                return;
            }else{
                req.flash('notificationSuccess', 'Thay đổi mật khẩu thành công');
                res.redirect('/changePassAdmin');
            }

        })      

    }

    // GET[]/login
    async gotoLogin(req,res){
        
        res.render('account/login', { layout: 'login' });
    }
    // GET[]/tongquan
    async tongQuan(req,res){
        const notificationSuccess = req.flash('notificationSuccess');
        const notificationErr = req.flash('notificationErr');
        const hoTenND=req.session.user[0].hoTen;

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
                res.render('account/dasboard', { 
                    title: 'Tổng Quan',
                    hoTenND:hoTenND,
                    notificationSuccess,
                    notificationErr });
            })

        })
    }    

    // POST[]/login
    async loginAccount(req,res){
        const idNhanVien=req.body.idNhanVien;
        const matKhau=req.body.matKhau;
        let message=[];
        
        const querry=`SELECT *  FROM NhanVien WHERE idNhanVien=? and hienThi=1`;
        const values=[idNhanVien,matKhau];
        connection.query(querry,values,(err,results)=>{
            if(err){
                console.error('Lỗi',err.message);
                return;
            }
            if(results.length==0){
                message.push({err:'Người dùng không tồn tại'});
                res.render('account/login', { layout: 'login',
                message:message ,
                idNhanVien:req.body.idNhanVien,
                matKhau: req.body.matKhau});
            }else{
                const storedPassword = results[0].matKhau;
                if(matKhau!==storedPassword){
                    message.push({err:'Mật khẩu không đúng'});
                    res.render('account/login', { layout: 'login',
                    message:message,
                    idNhanVien:req.body.idNhanVien,
                    matKhau: req.body.matKhau});                    
                }else{
                    const objectNV=JSON.parse(JSON.stringify(results));   
                    req.session.user =objectNV;
                    req.flash('notificationSuccess', 'Đăng nhập thành công');
                    res.redirect('/tongquan');

                }
            }
            
            
        })        
    }    
}
module.exports = new quanlythongtin()