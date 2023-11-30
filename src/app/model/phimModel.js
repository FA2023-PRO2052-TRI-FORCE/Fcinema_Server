const connection = require("../../config/connection");

class phimModel {
  //get All phim
  async getAllPhim() {
    return new Promise((resolve, reject) => {
      const queryPhim = 'SELECT * FROM Phim WHERE hienThi=1';
      connection.query(queryPhim, (err, resultsPhim) => {
        if (err) {
          reject(err);
        } else {
          resolve(resultsPhim);
        }
      });
    });
  }




  // update phim by current date
  async updatePhimByNgayChieu() {
    return new Promise((resolve, reject) => {
      const updatePhimQuerry = `
            UPDATE Phim SET trangThai=0
            WHERE idPhim IN (SELECT l.idPhim FROM LichChieu l WHERE l.ngayChieu < CURRENT_DATE)`;
      connection.query(updatePhimQuerry, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

}
module.exports = phimModel;