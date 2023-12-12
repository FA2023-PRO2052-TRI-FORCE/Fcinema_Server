const path = require("path");
const connection = require("../../../config/connection");
const getAllPhimDC = (req, res) => {
  connection.query(
    "select a.tenPhim, a.anh, a.nuocSX, a.namSX, a.thoiLuong, a.ngonNgu, a.daoDien," +
      "a.idPhim, a.moTa, b.idLichChieu, b.giaPhim, b.ngayChieu, b.caChieu, c.tenTheLoai, d.idPhongChieu, d.tenPhongChieu from phim a join lichChieu b on a.idPhim = b.idPhim" +
      " join theLoai c on a.idTheLoai = c.idTheLoai join phongChieu d on b.idPhongChieu = d.idPhongChieu where b.hienThi = 1 ",
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
};

const getAllPhimSC = (req, res) => {
  connection.query(
    "select a.anh, a.tenPhim, a.nuocSX, a.namSX, a.thoiLuong, a.ngonNgu, a.daoDien, a.moTa, b.tenTheLoai from phim a join theLoai b on a.idTheLoai = b.idTheLoai where a.trangThai = 1 and a.hienThi = 1",
    (err, result) => {
      if (err) throw err;

      console.log(result);

      res.send(result);
    }
  );
};

const getViTriGheById = (req, res) => {
  const id = req.params.id;
  console.log("check data: ", id);
  connection.query(
    "select a.tenGhe from vitrighe a join ve b on a.idve=b.idve join lichChieu c on b.idLichChieu = c.idLichChieu where c.idLichChieu = ?",
    [id],
    (err, result) => {
      if (err) throw err;
      // res.json({ data: result });
      res.send(result);
    }
  );
};
const getPhimByTheLoai = (req, res) => {
  const id = req.params.id;
  console.log("check id", id);
  connection.query(
    "select a.anh, a.tenPhim, a.nuocSX, a.namSX, a.thoiLuong, a.ngonNgu, a.daoDien, b.tenTheLoai from phim a join theLoai b on a.idTheLoai = b.idTheLoai where a.trangThai = 1 and b.idTheLoai = ? and b.hienThi=1",
    [id],
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
};
const getPhimDCByNgay = (req, res) => {
  const ngay = req.params.day;
  connection.query(
    "select a.tenPhim, a.anh, a.nuocSX, a.namSX, a.thoiLuong, a.ngonNgu, a.daoDien, " +
      "a.idPhim, a.moTa, b.idLichChieu, b.giaPhim, b.ngayChieu, b.caChieu, c.tenTheLoai, d.idPhongChieu, d.tenPhongChieu from phim a join lichChieu b on a.idPhim = b.idPhim" +
      " join theLoai c on a.idTheLoai = c.idTheLoai join phongChieu d on b.idPhongChieu = d.idPhongChieu where b.hienThi = 1 and b.ngayChieu = ?",
    [ngay],
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
};

const getBanner = (req, res) => {
  let query = "select * from baner where hienThi = 1";
  connection.execute(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};
module.exports = {
  getAllPhimDC,
  getAllPhimSC,
  getViTriGheById,
  getPhimByTheLoai,
  getPhimDCByNgay,
  getBanner,
};
