const connection = require("../../../config/connection");
const postDatVe = (req, res) => {
  const {
    mVeModel: ve,
    mViTriGheModel: ghe,
    mJsonArray: data,
    mDoAnModels: doAn,
  } = req.body;

  console.log(req.body);

  const insertVeQuery =
    "INSERT INTO ve (idVe, soVe, ngayMua, tongTien, trangThai, phuongThucTT, email, idLichChieu) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  const insertVeParams = [
    ve.idVe,
    ve.soVe,
    ve.ngayMua,
    ve.tongTien,
    ve.trangThai,
    ve.phuongThucTT,
    ve.email,
    ve.idLichChieu,
  ];

  connection.query(insertVeQuery, insertVeParams, (err, result) => {
    if (err) throw err;

    const insertViTriGheQuery =
      "INSERT INTO vitrighe (tenGhe, idPhongChieu, idVe, trangThai) VALUES (?, ?, ?, ?)";
    const insertViTriGheParams = [
      JSON.stringify(data),
      ghe.idPhongChieu,
      ghe.idVe,
      1,
    ];

    connection.query(
      insertViTriGheQuery,
      insertViTriGheParams,
      (err, result) => {
        if (err) throw err;

        if (doAn != "") {
          for (let i = 0; i < doAn.length; i++) {
            const insertChiTietDoAnQuery =
              "INSERT INTO chitietdoan (soLuong, idDoAn, idVe) VALUES (?, ?, ?)";
            const insertChiTietDoAnParams = [
              doAn[i].soLuong,
              doAn[i].idDoAn,
              ve.idVe,
            ];

            connection.query(
              insertChiTietDoAnQuery,
              insertChiTietDoAnParams,
              (err, result) => {
                if (err) throw err;
                const updateDoAnQuery =
                  "UPDATE doan SET coSan = coSan - ? where idDoAn = ?";
                const updateDoAnParams = [doAn[i].soLuong, doAn[i].idDoAn];
                connection.query(
                  updateDoAnQuery,
                  updateDoAnParams,
                  (err, result) => {
                    if (err) throw err;
                    console.log("Update Do An Success");
                  }
                );
                if (i === doAn.length - 1) {
                }
              }
            );
          }
        }
        res.status(200).send("them du lieu thanh cong");
      }
    );
  });
};

const getVeDat = (req, res) => {
  const email = req.params.email;
  console.log(email);
  connection.query(
    "select a.tenPhim,a.anh, b.giaPhim, b.caChieu, b.ngayChieu, d.tenPhongChieu,c.ngayMua,c.phuongThucTT, c.trangThai, c.idVe, c.soVe, C.tongTien, e.tenGhe " +
      "from phim a join lichChieu b on a.idPhim = b.idPhim join ve c on b.idLichChieu=c.idLichChieu join phongChieu d on b.idPhongChieu = d.idPhongChieu " +
      "join vitrighe e on e.idVe=c.idVe where c.email = ? ORDER BY c.ngayMua DESC",

    [email],
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
