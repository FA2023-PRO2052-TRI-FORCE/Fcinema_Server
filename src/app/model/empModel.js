const connection = require("../../config/connection");

class employeeModel {
    // lay toan bo ds nhan vien
    async getAllNhanVien() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM NhanVien WHERE hienThi = 1 AND vaiTro != "admin"';
            connection.query(query, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // lay nhan vien :id 
    async getNhanVienById(idNhanVien) {
        return new Promise((resolve, reject) => {
            const selectEmployeeQuery = 'SELECT * FROM NhanVien WHERE idNhanVien = ?';

            connection.query(selectEmployeeQuery, [idNhanVien], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // lay nhan vien id, mk
    async getUserByIdAndPassword(idNhanVien) {
        return new Promise((resolve, reject) => {
          const query = 'SELECT * FROM NhanVien WHERE idNhanVien=? AND hienThi=1';
          const values = [idNhanVien];
          connection.query(query, values, (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          });
        });
      }    

    // check thong tin nhan vien
    async checkNhanVienByIdEmailPhone(idNhanVien, email, dienThoai) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM NhanVien WHERE idNhanVien = ? OR email = ? OR dienThoai = ?';
            connection.query(query, [idNhanVien, email, dienThoai], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // them nhan vien
    async insertNhanVien(nhanVienData) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO NhanVien SET ?';
            connection.query(query, nhanVienData, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // cập nhật thông tin nhân viên theo id
    async updateNhanVienById(idNhanVien, hoTen, gioiTinh, ngaySinh, diaChi, email, dienThoai, anhStringBase64) {
        return new Promise((resolve, reject) => {
            const updateEmployeeQuery = anhStringBase64
                ? `UPDATE NhanVien SET hoTen = ?, gioiTinh = ?, ngaySinh = ?, diaChi = ?, anh = ?, email=?, dienThoai=? WHERE idNhanVien = ?`
                : `UPDATE NhanVien SET hoTen = ?, gioiTinh = ?, ngaySinh = ?, diaChi = ?, email=?, dienThoai=? WHERE idNhanVien = ?`;

            const updateEmployeeValues = anhStringBase64
                ? [hoTen, gioiTinh, new Date(ngaySinh), diaChi, anhStringBase64, email, dienThoai, idNhanVien]
                : [hoTen, gioiTinh, new Date(ngaySinh), diaChi, email, dienThoai, idNhanVien];

            connection.query(updateEmployeeQuery, updateEmployeeValues, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // cập nhật password:id
    async updatePasswordById(idNhanVien, newMatKhau) {
        return new Promise((resolve, reject) => {
          const query = 'UPDATE NhanVien SET matKhau=? WHERE idNhanVien=?';
          connection.query(query, [newMatKhau, idNhanVien], (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          });
        });
    }
    
    // cập nhật thông tin người dùng :id
    async updateInformationUserByID(idNhanVien, hoTen, dienThoai, email, anhStringBase64, ngaySinh, diaChi, gioiTinh) {
        return new Promise((resolve, reject) => {
          let query;
          let params;
    
          if (anhStringBase64) {
            query = `UPDATE NhanVien SET hoTen = ?, dienThoai = ?, email = ?, anh = ?, ngaySinh = ?, diaChi = ?, gioiTinh = ? WHERE idNhanVien = ?`;
            params = [hoTen, dienThoai, email, anhStringBase64, new Date(ngaySinh), diaChi, gioiTinh, idNhanVien];
          } else {
            query = `UPDATE NhanVien SET hoTen = ?, dienThoai = ?, email = ?, ngaySinh = ?, diaChi = ?, gioiTinh = ? WHERE idNhanVien = ?`;
            params = [hoTen, dienThoai, email, new Date(ngaySinh), diaChi, gioiTinh, idNhanVien];
          }
    
          connection.query(query, params, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
      }    

    // xoá nhân viên
    async deleteNhanVieByIdNhanVien(idNhanVien) {
        return new Promise((resolve, reject) => {
            const updateQuery = 'UPDATE NhanVien SET hienThi = 0 WHERE idNhanVien = ?';

            connection.query(updateQuery, [idNhanVien], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

}
module.exports = employeeModel;