const connection = require("../../../config/connection");

const getDoAn = (req, res) => {
  let sqlQuery = `SELECT * FROM doan where hienThi = 1`;
  connection.query(sqlQuery, function (err, result) {
    if (err) throw err;
    console.log("Data received from database");

    res.send(result);
  });
};
const getDoAnByVe = (req, res) => {
  let veId = req.params.veid;
  let sqlQuery = `SELECT a.soLuong, b.anh, b.giaDoAn, b.tenDoAn, b.idDoAn FROM chiTietDoAn a join doan b on a.idDoAn = b.idDoAn WHERE a.idVe = ?`;
  connection.query(sqlQuery, veId, (err, results) => {
    if (err) throw err;
    console.log("data received");
    res.send(results);
  });
};

module.exports = {
  getDoAn,
  getDoAnByVe,
};
