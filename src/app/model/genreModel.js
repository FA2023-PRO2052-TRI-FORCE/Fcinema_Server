const connection = require("../../config/connection");

class genreModel {
    // lay toan bo ds loai phim
    async getAllLoaiPhim() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM TheLoai WHERE hienThi = 1';
            connection.query(query, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // check ten loai phim da ton tai hay chua
    async checkTenTheLoaiExists(tenTheLoai) {
        return new Promise((resolve, reject) => {
            const checkQuery = 'SELECT * FROM TheLoai WHERE tenTheLoai=?';
            connection.query(checkQuery, [tenTheLoai], (checkErr, checkResult) => {
                if (checkErr) {
                    reject(checkErr);
                } else {
                    resolve(checkResult.length > 0);
                }
            });
        });
    }


    // them loai phim moi
    async insertLoaiPhim(tenTheLoai, hienThi) {
        return new Promise((resolve, reject) => {
            const insertQuery = 'INSERT INTO TheLoai (tenTheLoai, hienThi) VALUES (?, ?)';
            connection.query(insertQuery, [tenTheLoai, hienThi], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // get loai phim by id
    async getLoaiPhimById(idTheLoai) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM TheLoai WHERE idTheLoai = ? AND hienThi = 1';
            connection.query(query, [idTheLoai], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // cap nhat phim by id
    async updateLoaiPhimById(idTheLoai, tenTheLoai) {
        return new Promise((resolve, reject) => {
            const updateQuery = 'UPDATE TheLoai SET tenTheLoai = ? WHERE idTheLoai = ?';
            connection.query(updateQuery, [tenTheLoai, idTheLoai], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // xoa loai phim by id
    async deleteLoaiPhimByIdLoaiPhim(idTheLoai) {
        return new Promise((resolve, reject) => {
            const updateQuery = 'UPDATE TheLoai SET hienThi = 0 WHERE idTheLoai = ?';
            connection.query(updateQuery, [idTheLoai], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}
module.exports = genreModel;