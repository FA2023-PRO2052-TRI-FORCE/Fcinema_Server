const connection = require("../../config/connection");

class phimModel {
  //[lịch chiếu]get All phim
  async getAllPhim() {
    return new Promise((resolve, reject) => {
      const queryPhim = "SELECT * FROM Phim WHERE hienThi=1 ORDER BY trangThai DESC";
      connection.query(queryPhim, (err, resultsPhim) => {
        if (err) {
          reject(err);
        } else {
          resolve(resultsPhim);
        }
      });
    });
  }
  // get Phims
  async getListPhim() {
    return new Promise((resolve, reject) => {
      const querry = `SELECT p.*, t.tenTheLoai FROM Phim p
        INNER JOIN TheLoai t ON p.idTheLoai = t.idTheLoai
        WHERE p.hienThi = 1 ORDER BY ngayThem DESC`;

      connection.query(querry, (err, result) => {
        if (err) {
          console.error("Lỗi", err.message);
          return reject(err);
        }

        resolve(result);
      });
    });
  }
  //get phim by id
  async getPhimById(idPhim) {
    return new Promise((resolve, reject) => {
      const query =
        "SELECT p.*, t.tenTheLoai FROM Phim p JOIN TheLoai t ON p.idTheLoai=t.idTheLoai WHERE p.idPhim = ? AND p.hienThi = 1";
      connection.query(query, [idPhim], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  // insert phim
  async insertPhim(data) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO Phim (tenPhim, anh, ngonNgu, moTa, hangSX, nuocSX, namSX, thoiLuong, daoDien, dienVien, idTheLoai, ngayThem) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      connection.query(query, data, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  //update phim by id
  async updatePhim(
    idPhim,
    ngonNgu,
    moTa,
    daoDien,
    dienVien,
    hangSX,
    thoiLuong,
    nuocSX,
    anhStringBase64,
    callback
  ) {
    const updateQuery = anhStringBase64
      ? `UPDATE Phim SET ngonNgu=?, moTa=?, daoDien=?, dienVien=?, hangSX=?, thoiLuong=?, nuocSX=?, anh=? WHERE idPhim=?`
      : `UPDATE Phim SET ngonNgu=?, moTa=?, daoDien=?, dienVien=?, hangSX=?, thoiLuong=?, nuocSX=? WHERE idPhim=?`;

    const updateValues = anhStringBase64
      ? [
          ngonNgu,
          moTa,
          daoDien,
          dienVien,
          hangSX,
          thoiLuong,
          nuocSX,
          anhStringBase64,
          idPhim
        ]
      : [ngonNgu, moTa, daoDien, dienVien, hangSX, thoiLuong, nuocSX, idPhim];

    connection.query(updateQuery, updateValues, callback);
  }
  // update trang thai phim by current date
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

  // delete phim
  async deletePhim(idPhim) {
    return new Promise((resolve, reject) => {
      const query = "UPDATE Phim SET hienThi = 0 WHERE idPhim = ?";
      connection.query(query, [idPhim], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}
module.exports = phimModel;
