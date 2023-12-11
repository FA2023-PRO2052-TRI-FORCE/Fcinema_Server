const express = require("express");
const router = express.Router();
const taiKhoanND = require("../app/controller/apiApp/taiKhoanController");
const PhimController = require("../app/controller/apiApp/PhimController");
const VeController = require("../app/controller/apiApp/VeController");
const TheLoaiController = require("../app/controller/apiApp/TheLoaiController");
const DoAnController = require("../app/controller/apiApp/DoAnController");

router.post("/nguoidung/dangky", taiKhoanND.registerNguoiDung);
router.post("/nguoidung/dangnhap", taiKhoanND.loginNguoiDung);
router.post("/resetMatKhauRequest", taiKhoanND.resetMatKhauRequest);
router.post("/comfirmResetMatKhau", taiKhoanND.comfirmResetMatKhau);
router.get(
  "/nguoidung/thongtin/:email",
  taiKhoanND.getThongTinNguoiDungByEmail
);
router.put("/nguoidung/doithongtin/:email", taiKhoanND.updateThongTinNguoiDung);
router.put("/nguoidung/doimatkhau/:email", taiKhoanND.changePasswordByEmail);
router.put("/nguoidung/xoaTaiKhoan", taiKhoanND.deleteTaiKhoan);
router.post('/nguoidung/xacthuc',taiKhoanND.requestAthenciationEmail)
///apiApp/Phim
router.get("/phimDC", PhimController.getAllPhimDC);
router.get("/phimSC", PhimController.getAllPhimSC);
router.get("/ghe/:id", PhimController.getViTriGheById);
router.get("/phimSC/:id", PhimController.getPhimByTheLoai);
router.get("/phimDC/:day", PhimController.getPhimDCByNgay);

///apiApp/ve
router.post("/ve", VeController.postDatVe);
router.get("/ve/dsve/:email", VeController.getVeDat);

///apiApp/theLoai
router.get("/theLoai", TheLoaiController.getTheLoai);

///apiApp/doan
router.get("/doan", DoAnController.getDoAn);
//api banner
router.get("/banner", PhimController.getBanner);
//api dang ky gg
router.post("/dangky/gg", taiKhoanND.regisByGoogle);
router.get("/doAn/:veid", DoAnController.getDoAnByVe);

module.exports = router;
