const connection=require('../../config/connection');

class ViTriGheModel {
  // insert viTriGhe
    insertViTriGhe(insertVTGValues) {
      const insertVTGQuery = `INSERT INTO ViTriGhe (tenGhe, trangThai, idPhongChieu, idVe) VALUES (?, ?, ?, ?)`;
      return new Promise((resolve, reject) => {
        connection.query(insertVTGQuery, insertVTGValues, (errVTG, resultsVTG) => {
          if (errVTG) {
            return reject(errVTG);
          }
          resolve(resultsVTG);
        });
      });
    }
  }
  
  module.exports = ViTriGheModel;