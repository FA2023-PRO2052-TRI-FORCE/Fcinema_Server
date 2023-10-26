const connection = require("../../../config/connection");
const postDatVe = (req, res) => {
  const ve = req.body.mVeModel;
  const ghe = req.body.mViTriGheModel;
  const data = req.body.mJsonArray;
  connection.query(
    "insert into ve (idVe, soVe, ngayMua, tongTien, ngayThanhToan, trangThai, idLichChieu) values (?, ?, ?, ?, ?, ?, ?)",
    [ve.idVe, ve.soVe, ve.ngayMua, ve.tongTien, ve.ngayTT, 1, ve.idLichChieu],
    (err, result) => {
      if (err) throw err;
      else {
        connection.query(
          "insert into vitrighe (tenGhe, idPhongChieu, idVe, trangThai) values (?, ?, ?, ?)",
          [JSON.stringify(data), ghe.idPhongChieu, ghe.idVe, 1],
          (err, result) => {
            if (err) throw err;
            res.status(200).send("them du lieu thanh cong");
          }
        );
      }
    }
  );
};

const getVeDat = (req, res) => {
  connection.query(
    "select a.tenPhim, b.giaPhim, b.caChieu, b.ngayChieu, d.tenPhongChieu,c.ngayMua,c.phuongThucTT, c.trangThai, c.idVe, c.soVe, C.tongTien, e.tenGhe " +
      "from phim a join lichChieu b on a.idPhim = b.idPhim join ve c on b.idLichChieu=c.idLichChieu join phongChieu d on b.idPhongChieu = d.idPhongChieu " +
      "join vitrighe e on e.idVe=c.idVe",
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
};

module.exports = {
  postDatVe,
  getVeDat,
};
