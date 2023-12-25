const express = require("express");
const router = express.Router();
const taiKhoanND = require("../app/controller/apiApp/accountUserController");
const PhimController = require("../app/controller/apiApp/movieAppController");
const VeController = require("../app/controller/apiApp/ticketAppController");
const TheLoaiController = require("../app/controller/apiApp/GenreAppController");
const DoAnController = require("../app/controller/apiApp/popcornAppController");

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
