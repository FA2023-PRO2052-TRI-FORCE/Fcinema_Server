const connection = require("../../config/connection");

class userModel {
    //getAllKhachHang
    getAllKhachhang() {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM NguoiDung`;
            connection.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    //getKhachHangByEmail
    getKhachHangByEmail(email) {
        return new Promise((resolve, reject) => { 
            const query = "SELECT * FROM NguoiDung WHERE email=?";
            connection.query(query,[email],(err, results)=>{
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }            
            })
        });
    }

    //updateKhachHangByEmail
    updateKhachHangByEmail(email){
        return new Promise((resolve, reject) => { 
            const query='UPDATE NguoiDung SET trangThaiNguoiDung=0, hienThi=0 WHERE email=?';
            connection.query(query,[email],(err, results)=>{
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }            
            })
        });        
    }

}
module.exports = userModel;
