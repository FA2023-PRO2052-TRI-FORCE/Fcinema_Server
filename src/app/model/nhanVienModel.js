const connection = require("../../config/connection");

class nhanVieModel {
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

    // cap nhat nhan vien
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
    // xoa nhan vien
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
module.exports = nhanVieModel;