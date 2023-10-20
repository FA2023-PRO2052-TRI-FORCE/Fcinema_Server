const express = require("express");
const router = express.Router();
const taiKhoanND = require("../app/controller/apiApp/taiKhoanController");

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

///apiApp/Phim
router.get("/phimDC", PhimController.getAllPhimDC);
router.get("/phimSC", PhimController.getAllPhimSC);
router.get("/ghe/:id", PhimController.getViTriGheById);
///apiApp/ve
router.post("/ve", VeController.postDatVe);
router.get("/ve", VeController.getVeDat);

module.exports = router;
