const connection = require("../../config/connection");
class VeModel {
  // getAllve
  async getAllVeDaDat() {
    return new Promise((resolve, reject) => {
      const query = `SELECT v.idVe, p.tenPhim, l.ngayChieu, l.caChieu, t.tenPhongChieu, v.soVe, v.ngayMua, v.tongTien, v.trangThai, g.tenGhe
        FROM ve v JOIN lichchieu l ON v.idLichChieu = l.idLichChieu JOIN phim p ON l.idPhim = p.idPhim 
        JOIN phongchieu t ON l.idPhongChieu = t.idPhongChieu JOIN ViTriGhe g ON g.idVe = v.idVe  
        ORDER BY v.ngayMua DESC`;

      connection.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }  
  // getVeById
  async getVeById(idVe) {
    return new Promise((resolve, reject) => {
      const querryVe = `SELECT p.*, l.ngayChieu, l.caChieu, t.tenPhongChieu, v.*, g.tenGhe
        FROM ve v 
        JOIN lichchieu l ON v.idLichChieu = l.idLichChieu 
        JOIN phim p ON l.idPhim = p.idPhim 
        JOIN phongchieu t ON l.idPhongChieu = t.idPhongChieu 
        JOIN ViTriGhe g ON g.idVe = v.idVe 
        WHERE v.idVe=?`;

      connection.query(querryVe, [idVe], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }  

  // insertNewVe
  async insertNewVe(insertValues) {
    const insertVeQuery = `INSERT INTO VE (idVe, soVe, ngayMua, tongTien, trangThai, phuongThucTT, email, idNhanVien, idLichChieu) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    return new Promise((resolve, reject) => {
      connection.query(insertVeQuery, insertValues, (errVe, resultsVe) => {
        if (errVe) {
          return reject(errVe);
        }
        resolve(resultsVe);
      });
    });
  }
  // updateTrangThaive
  async updateTrangThaiVe(idVe, trangThai) {
    return new Promise((resolve, reject) => {
      const updateTTQuerry = 'UPDATE Ve SET trangThai=? WHERE idVe=?';
      const updateTTValues = [trangThai, idVe];

      connection.query(updateTTQuerry, updateTTValues, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }  

  // update trang thai ve: hết hạn
  async updateVeExpired() {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE VE v
        INNER JOIN lichchieu l ON v.idLichChieu = l.idLichChieu
        SET v.trangThai=2
        WHERE l.ngayChieu < CURRENT_DATE
      `;
      connection.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }  
}
  
  module.exports = VeModel;