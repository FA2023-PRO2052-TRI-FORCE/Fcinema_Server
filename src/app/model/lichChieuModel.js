const connection = require('../../config/connection');

class LichChieuModel {

  // getLichChieu For insert ve 
  async getAllLichChieu() {
    return new Promise((resolve, reject) => {
      const query = `SELECT p.anh, p.tenPhim, q.idPhongChieu, q.tenPhongChieu, l.idLichChieu, l.ngayChieu, l.caChieu, MAX(l.giaPhim) AS giaPhim, GROUP_CONCAT(g.tenGhe) AS tenGhe    
        FROM
            lichchieu l
            JOIN phim p ON l.idPhim = p.idPhim
            JOIN phongchieu q ON l.idPhongChieu = q.idPhongChieu    
            LEFT JOIN ve v ON l.idLichChieu = v.idLichChieu
            LEFT JOIN vitrighe g ON g.idVe = v.idVe
        WHERE
            l.hienThi = 1
        GROUP BY
            q.idPhongChieu,
            q.tenPhongChieu,
            l.ngayChieu,
            l.caChieu,
            l.idLichChieu`;

      connection.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
  // getUpdateLichChieu
  async updateLichChieuByCurrentDate() {
    return new Promise((resolve, reject) => {
      const query = `UPDATE LichChieu SET hienThi=0  WHERE ngayChieu < CURRENT_DATE`;
      connection.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
  // getLichChieuForAdmin
  async getListLichChieu() {
    return new Promise((resolve, reject) => {
      const query = `SELECT p.tenPhim,p.anh,p.thoiLuong,t.idLichChieu,t.ngayChieu,t.caChieu,t.giaPhim,t.ngayThem, c.tenPhongChieu FROM lichchieu t, Phim p , phongchieu c
      WHERE t.idPhim=p.idPhim and t.idPhongChieu=c.idPhongChieu and t.hienThi=1 ORDER BY t.ngayChieu ASC`;

      connection.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      })
    })
  }

  // get chi tiet lich chieu:idLichChieu
  async getChiTietLichChieu(idLichChieu) {
    return new Promise((resolve, reject) => {
      const query = `SELECT p.tenPhim,t.idLichChieu,t.ngayChieu,t.caChieu,t.giaPhim,t.ngayThem, c.tenPhongChieu FROM lichchieu t, Phim p , phongchieu c
            WHERE t.idPhim=p.idPhim and t.idPhongChieu=c.idPhongChieu and t.idLichChieu=?`;

      connection.query(query, [idLichChieu], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }  

  // seacrch lich chieu
  async findLichChieu(tenPhimSearch) {
    return new Promise((resolve, reject) => {
      const query = `SELECT p.tenPhim,p.anh,p.thoiLuong,t.idLichChieu,t.ngayChieu,t.caChieu,t.giaPhim,t.ngayThem, c.tenPhongChieu FROM lichchieu t, Phim p , phongchieu c
      WHERE t.idPhim=p.idPhim and t.idPhongChieu=c.idPhongChieu and t.hienThi=1 and p.tenPhim=?`

      connection.query(query, [tenPhimSearch], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      })
    })
  }

  //check lich chieu da ton tai truoc do chua
  async checkLichChieuExists(caChieu, ngayChieu, idPhongChieu) {
    return new Promise((resolve, reject) => {
      const checkQuery = `SELECT COUNT(*) AS count FROM lichchieu WHERE caChieu=? AND ngayChieu=? AND idPhongChieu=?`;
      const checkValues = [caChieu, ngayChieu, idPhongChieu];

      connection.query(checkQuery, checkValues, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0].count > 0);
        }
      });
    });
  }

  // them lich chieu moi
  async insertLichChieu(ngayChieu, caChieu, giaPhim, idPhongChieu, idPhim) {
    return new Promise((resolve, reject) => {
      const insertQuery = `INSERT INTO LichChieu (ngayChieu, caChieu, giaPhim, ngayThem, hienThi, idPhongChieu, idPhim)
                VALUES (?, ?, ?, ?, ?, ?, ?)`;

      const insertValues = [ngayChieu, caChieu, giaPhim, new Date(), 1, idPhongChieu, idPhim];

      connection.query(insertQuery, insertValues, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  //cap nhat lai lich chieu
  async updateLichChieu(ngayChieu,caChieu, giaPhim,idLichChieu) {
    return new Promise((resolve, reject) => {
      const updateQuery = `UPDATE LichChieu SET ngayChieu = ?, caChieu= ?, giaPhim=? WHERE idLichChieu=?`;
      const updateValues= [new Date(ngayChieu),caChieu, giaPhim, idLichChieu];

      connection.query(updateQuery, updateValues,(err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }  

  // cap nhat lai trang thai phim la dang chieu
  async updatePhimStatus(idPhim) {
    return new Promise((resolve, reject) => {
      const updateQuery = `UPDATE Phim SET trangThai=0 WHERE idPhim=?`;
      connection.query(updateQuery, [idPhim], (errUpdate, updateResults) => {
        if (errUpdate) {
          reject(errUpdate);
        } else {
          resolve(updateResults);
        }
      });
    });
  }

  // xoa lich chieu
  async deleteLichChieu(idLichChieu) {
    return new Promise((resolve, reject) => {
      const updateQuery = `UPDATE LichChieu SET hienThi=0 WHERE idLichChieu=?`;

      connection.query(updateQuery, [idLichChieu], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }  

}

module.exports = LichChieuModel;