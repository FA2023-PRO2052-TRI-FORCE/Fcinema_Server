const connection = require('../../config/connection')

class banerModel {
    //getAllBaner
    async getAllBaner() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Baner WHERE hienThi=1 ORDER BY ngayThem DESC';
            connection.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
    // insert baner
    async insertNewBaner(anhStringBase64) {
        return new Promise((resolve, reject) => {
            const insertQuery = `INSERT INTO Baner (anh, hienThi, ngayThem) VALUES (?, ?, ?)`;
            const insertValues = [anhStringBase64, 1, new Date()]
            connection.query(insertQuery, insertValues, (err, results) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        })
    }
    // getBanerById
    async getBanerById(idBaner) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Baner WHERE idBaner=?';
            connection.query(query, [idBaner], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
    // updateBaner
    async updateBaner(anhStringBase64, idBaner) {
        return new Promise((resolve, reject) => {
            let updateQuery;
            let updateValues;

            if (anhStringBase64) {
                updateQuery = 'UPDATE Baner SET anh=? WHERE idBaner=?';
                updateValues = [anhStringBase64, idBaner];

                connection.query(updateQuery, updateValues, (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
            }
        });
    }
    // deleteBaner
    async deleteBaner(idBaner) {
        return new Promise((resolve, reject) => {
            const updateQuery = 'DELETE FROM Baner WHERE idBaner=?';
            connection.query(updateQuery, [idBaner], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

}
module.exports = banerModel;