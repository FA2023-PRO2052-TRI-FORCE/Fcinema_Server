const connection=require('../../config/connection');

class qlNhanVien{
    // Ví dụ ở màn hình nhân viên tôi sẽ truy vấn lấy tất cả nhân viên có hienThi=1 và gửi list json nhân viên đó vào màn hình nhân viên
    async goToScreen(req,res){
<<<<<<< Updated upstream
        res.render('nhanVien')
=======
        const querry=`SELECT * FROM NhanVien WHERE hienThi=1`;

        connection.query(querry,(err,result)=>{
            // kiểm tra truy vấn nếu có lỗi thì sẽ log lỗi ra và return không thực hiện các câu lệnh dưới
            if(err){
                console.error("Lỗi",err.message);
                return;
            }
                    
            // result chính là dữ liệu được trả về ==>list nhân viên 
            // Tiếp theo ở phần view của màn hình nhân viên tôi sẽ lấy dữ liệu nhân viên đổ lên table
            console.log("========");
            console.log("",result);
            res.render('nhanvien', { listNhanVien: result,title: 'Nhân Viên' });
        })
        
        // res.render('nhanVien', { title: 'Nhân Viên' })
>>>>>>> Stashed changes
    }
    async goToAdd(req,res){
        res.render('themNhanVien')
    }

}
module.exports = new qlNhanVien();