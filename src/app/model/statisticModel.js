const connection = require('../../config/connection');

class statisticModel {
  // đếm tổng số phim đang chiêu
  async getCountAllLichChieu() {
    return new Promise((resolve, reject) => {
      const query = `SELECT COUNT(idLichChieu) AS tongLichChieu 
                FROM lichchieu WHERE hienThi=1`;
      connection.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      })
    })
  }
  // đếm tổng số vẽ đã bán 
  async getCountAllVeSold() {
    return new Promise((resolve, reject) => {
      const query = `SELECT COUNT(idVe) AS tongSo FROM ve`;
      connection.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      })
    })

  }
  // đếm tổng số lịch chiếu trong ngày hôm nay
  async getCountAllShowtimesToday() {
    return new Promise((resolve, reject) => {
      const query = `SELECT COUNT(idLichChieu) AS tongSo FROM lichchieu WHERE ngayChieu=CURRENT_DATE `;
      connection.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      })
    })
  }
  // đếm tổng số vé bán hôm nay
  async getCountAllVeSoldToday() {
    return new Promise((resolve, reject) => {
      const query = `SELECT COUNT(idVe) AS tongSo FROM ve WHERE ngayMua=CURRENT_DATE `;
      connection.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      })
    })

  }
  // đếm tổng số vé bán online hôm nay
  async getCountAllVeOnline() {
    return new Promise((resolve, reject) => {
      const query = `SELECT COUNT(*) as tong FROM Ve WHERE email IS NOT NULL AND ngayMua = CURRENT_DATE`;
      connection.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      })
    })
  }
  // đếm tổng số vé đã bán hôm nay 
  async getCountAllVeAtCinema() {
    return new Promise((resolve, reject) => {
      const query = `SELECT COUNT(*) as tong FROM Ve WHERE idNhanVien IS NOT NULL and ngayMua= CURRENT_DATE`;
      connection.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      })
    });
  }
  // đếm tổng số tồn kho của sản phẩm
  async getCountCoSan() {
    return new Promise((resolve, reject) => {
      const querry = `SELECT SUM(coSan) AS tongCoSan FROM DoAn WHERE hienThi = 1;`
      connection.query(querry, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
  // lấy tên của sản phẩm đang tồn kho
  async getNameProduct() {
    return new Promise((resolve, reject) => {
      const query = `SELECT tenDoAn FROM DoAn WHERE hienThi = 1 and coSan>0 GROUP BY tenDoAn`;
      connection.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
  // lấy tổng số tồn kho của sản phẩm
  async getQuantityProduct() {
    return new Promise((resolve, reject) => {
      const query = `SELECT coSan as tong FROM DoAn WHERE hienThi = 1 and coSan>0 GROUP BY tenDoAn`;
      connection.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  // lấy ngày trong 7 ngày
  async getDateStatisticsFor7days() {
    return new Promise((resolve, reject) => {
      const createTempTableQuerry = `
          CREATE TEMPORARY TABLE IF NOT EXISTS AllDays (
            Ngay DATE
        )`;

      const insertDataQuerry = `
            INSERT INTO AllDays (Ngay)
            VALUES
              (CURDATE() - INTERVAL 6 DAY),
              (CURDATE() - INTERVAL 5 DAY),
              (CURDATE() - INTERVAL 4 DAY),
              (CURDATE() - INTERVAL 3 DAY),
              (CURDATE() - INTERVAL 2 DAY),
              (CURDATE() - INTERVAL 1 DAY),
              (CURDATE());
          `;

      const selectDataQuerry = `
            SELECT AllDays.Ngay
            FROM AllDays
            LEFT JOIN Ve ON AllDays.Ngay = DATE(Ve.ngayMua)
            WHERE AllDays.Ngay BETWEEN CURDATE() - INTERVAL 6 DAY AND CURDATE()
            GROUP BY AllDays.Ngay;
          `;

      connection.query(createTempTableQuerry, (errorCreateTable) => {
        if (errorCreateTable) {
          reject(errorCreateTable);
        } else {
          connection.query(insertDataQuerry, (errorInsertData) => {
            if (errorInsertData) {
              reject(errorInsertData);
            } else {
              connection.query(selectDataQuerry, (errorSelectData, results) => {
                if (errorSelectData) {
                  reject(errorSelectData);
                } else {
                  const values = results.map(result => {
                    const currentDate = new Date(result.Ngay);
                    currentDate.setDate(currentDate.getDate() + 1);
                    const formattedDate = currentDate.toISOString().split('T')[0];
                    return formattedDate;
                  });

                  resolve(values);
                }
              });
            }
          });
        }
      });
    });
  }
  // lấy số lượng vé đã bán trong 7 ngày qua
  async getVeStatisticsFor7days() {
    return new Promise((resolve, reject) => {
      const createTempTableQuerry = `
            CREATE TEMPORARY TABLE IF NOT EXISTS AllDays (
              Ngay DATE
            );
          `;

      const insertDataQuerry = `
            INSERT INTO AllDays (Ngay)
            VALUES
              (CURDATE() - INTERVAL 6 DAY),
              (CURDATE() - INTERVAL 5 DAY),
              (CURDATE() - INTERVAL 4 DAY),
              (CURDATE() - INTERVAL 3 DAY),
              (CURDATE() - INTERVAL 2 DAY),
              (CURDATE() - INTERVAL 1 DAY),
              (CURDATE());
          `;

      const selectDataQuerry = `
            SELECT AllDays.Ngay, COUNT(DISTINCT Ve.idVe) as tongSoVe
            FROM AllDays
            LEFT JOIN Ve ON AllDays.Ngay = DATE(Ve.ngayMua)
            WHERE AllDays.Ngay BETWEEN CURDATE() - INTERVAL 6 DAY AND CURDATE()
            GROUP BY AllDays.Ngay;
          `;

      connection.query(createTempTableQuerry, (errorCreateTable) => {
        if (errorCreateTable) {
          reject(errorCreateTable);
        } else {
          connection.query(insertDataQuerry, (errorInsertData) => {
            if (errorInsertData) {
              reject(errorInsertData);
            } else {
              connection.query(selectDataQuerry, (errorSelectData, results) => {
                if (errorSelectData) {
                  reject(errorSelectData);
                } else {
                  const values = results.map(result => result.tongSoVe);
                  resolve(values);
                }
              });
            }
          });
        }
      });
    });
  }
  // lấy doanh thu theo 7 ngày
  async getToTalRevenueVeStatisticsFor7days() {
    return new Promise((resolve, reject) => {
      const selectDataQuerry = `
        SELECT  COALESCE(SUM(Ve.tongTien), 0) AS tong
         FROM (
          SELECT CURDATE() - INTERVAL 6 DAY AS Ngay
          UNION SELECT CURDATE() - INTERVAL 5 DAY
          UNION SELECT CURDATE() - INTERVAL 4 DAY
          UNION SELECT CURDATE() - INTERVAL 3 DAY
          UNION SELECT CURDATE() - INTERVAL 2 DAY
          UNION SELECT CURDATE() - INTERVAL 1 DAY
          UNION SELECT CURDATE()
        ) all_days
        LEFT JOIN Ve ON DATE(all_days.Ngay) = DATE(Ve.ngayMua)
        GROUP BY DATE(all_days.Ngay);
        `;
      connection.query(selectDataQuerry, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      })



    });
  }

  // doanh thu 12 tháng trong năm
  async getStatistics12RevenueMonths() {
    return new Promise((resolve, reject) => {
      const query = `SELECT COALESCE(SUM(Ve.tongTien), 0) AS TongDoanhThu
      FROM (SELECT '2023-01-01' + INTERVAL n MONTH AS Thang
        FROM (SELECT 0 AS n UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION SELECT 11) AS n) all_months
      LEFT JOIN Ve ON DATE_FORMAT(all_months.Thang, '%Y-%m') = DATE_FORMAT(Ve.ngayMua, '%Y-%m')
      GROUP BY DATE_FORMAT(all_months.Thang, '%Y-%m')`;
      connection.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
  // tổng vé bán 12 tháng trong năm
  async getStatisticsVe12Months() {
    return new Promise((resolve, reject) => {
      const query = `SELECT COUNT(Ve.idVe) AS tong
      FROM (SELECT '2023-01-01' + INTERVAL n MONTH AS Thang
        FROM (SELECT 0 AS n UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION SELECT 11) AS n) all_months
      LEFT JOIN Ve ON DATE_FORMAT(all_months.Thang, '%Y-%m') = DATE_FORMAT(Ve.ngayMua, '%Y-%m')
      GROUP BY DATE_FORMAT(all_months.Thang, '%Y-%m')`;
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
module.exports = statisticModel;