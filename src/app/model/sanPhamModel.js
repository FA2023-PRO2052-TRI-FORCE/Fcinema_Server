const connection = require('../../config/connection');

class SanPhamModel {
    // getAllSanPham
    getAllSanPham() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM DoAn WHERE hienThi=1';
            connection.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
    // getAllSanPhamForVe
    getAllSanPhamMeasureStockQuantity() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM DoAn WHERE hienThi=1 and coSan>0';
            connection.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }    
    // getSanPhamById
    getSanPhamById(idDoAn) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM DoAn WHERE idDoAn=?';
            connection.query(query, [idDoAn], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }    

    // check if exist tenDoAn
    checkIfTenDoAnExists(tenDoAn) {
        return new Promise((resolve, reject) => {
            const checkQuery = 'SELECT * FROM DoAn WHERE tenDoAn=?';
            connection.query(checkQuery, [tenDoAn], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // insert san pham
    insertNewSanPham(tenDoAn, coSan, giaDoAn, anh) {
        return new Promise((resolve, reject) => {
            const insertQuery = 'INSERT INTO DoAn (tenDoAn, coSan, giaDoAn, anh, hienThi) VALUES (?, ?, ?, ?, ?)';
            const insertValues = [tenDoAn, coSan, giaDoAn, anh, 1];
            
            connection.query(insertQuery, insertValues, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
    // update san pham
    updateSanPhamById(idDoAn, tenDoAn, coSan, giaDoAn, anh) {
        return new Promise((resolve, reject) => {
            let updateQuery;
            let updateValues;

            if (anh) {
                updateQuery = 'UPDATE DoAn SET tenDoAn=?, coSan=?, giaDoAn=?, anh=? WHERE idDoAn=?';
                updateValues = [tenDoAn, coSan, giaDoAn, anh, idDoAn];
            } else {
                updateQuery = 'UPDATE DoAn SET tenDoAn=?, coSan=?, giaDoAn=? WHERE idDoAn=?';
                updateValues = [tenDoAn, coSan, giaDoAn, idDoAn];
            }

            connection.query(updateQuery, updateValues, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }   
    // update coSan
    updateCoSanById(updateDAValues) {
        const updateDAQuery = `UPDATE DoAn SET coSan = ? WHERE idDoAn = ?`;
        return new Promise((resolve, reject) => {
          updateDAValues.forEach((values) => {
            connection.query(updateDAQuery, values, (errorDA, resultsDA) => {
              if (errorDA) {
                return reject(errorDA);
              }else{
                resolve();
              }
            });
          });
        });
      }
    // delete san pham
    deleteSanPhamById(idDoAn) {
        return new Promise((resolve, reject) => {
            const deleteQuery = 'UPDATE DoAn SET hienThi = 0 WHERE idDoAn = ?';
            connection.query(deleteQuery, [idDoAn], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }    
}

module.exports = SanPhamModel;