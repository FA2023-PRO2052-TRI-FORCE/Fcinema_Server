const connection = require("../../../config/connection");

const getDoAn = (req, res) => {
  let sqlQuery = `SELECT * FROM doan where hienThi = 1`;
  connection.query(sqlQuery, function (err, result) {
    if (err) throw err;
    console.log("Data received from database");

    res.send(result);
  });
};

module.exports = {
  getDoAn,
};
