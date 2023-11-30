const connection=require('../../config/connection');
class ChiTietDoAnModel {
  // insertChiTietDoAn
  async insertChiTietDoAn(insertCTDAValues) {
      const insertCTDAQuery = `INSERT INTO ChiTietDoAn (soLuong, idDoAn, idVe) VALUES ?`;
      return new Promise((resolve, reject) => {
        connection.query(insertCTDAQuery, [insertCTDAValues], (errCTDA, resultsCTDA) => {
          if (errCTDA) {
            return reject(errCTDA);
          }
          resolve(resultsCTDA);
        });
      });
    }
  // getDoAnbyIdVe
  async getChiTietDoAnByIdVe(idVe) {
    return new Promise((resolve, reject) => {
      const querryCTDA = `SELECT c.soLuong, a.* 
        FROM chitietdoan c 
        JOIN Ve v ON v.idVe = c.idVe 
        JOIN DoAn a ON a.idDoAn = c.idDoAn 
        WHERE v.idVe=?`;

      connection.query(querryCTDA, [idVe], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }      
  }

  
  module.exports = ChiTietDoAnModel;