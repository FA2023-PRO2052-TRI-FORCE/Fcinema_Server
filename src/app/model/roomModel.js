const connection = require('../../config/connection');

class roomModel {

  //lay ds phong chieu =1
  async getAllPhongChieu() {
    return new Promise((resolve, reject) => {
      const queryPC = 'SELECT * FROM PhongChieu WHERE trangThai=1';
      connection.query(queryPC, (err, resultPC) => {
        if (err) {
          reject(err);
        } else {
          resolve(resultPC);
        }
      });
    });
  }

  // lay toan bo phong chieu
  async getPhongChieus() {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM PhongChieu`;

      connection.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  // update lai trang thai phong chieu
  async updateTrangThaiPhongChieu(idPhongChieu, newTrangThai) {
    return new Promise((resolve, reject) => {
      let updateTrangThaiQuery = [];

      if (newTrangThai == 0) {
        updateTrangThaiQuery = 'UPDATE PhongChieu SET trangThai=1 WHERE idPhongChieu=?';
      } else {
        updateTrangThaiQuery = 'UPDATE PhongChieu SET trangThai=0 WHERE idPhongChieu=?';
      }

      connection.query(updateTrangThaiQuery, [idPhongChieu], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

}
module.exports = roomModel;