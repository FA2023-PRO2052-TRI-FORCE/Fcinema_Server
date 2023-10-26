const connection = require("../../../config/connection");

const getTheLoai = (req, res) => {
  connection.query("select * from theLoai", (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

module.exports = {
  getTheLoai,
};
