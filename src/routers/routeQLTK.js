const express = require("express");
const router = express.Router();

const qlThonTin = require("../app/controller/quanlythongtin");

router.get("/login", qlThonTin.getLoginPage);
router.get("/logout", qlThonTin.logoutAccount);
router.get("/tongquan", qlThonTin.getTongQuan);
router.get("/myAccount", qlThonTin.getUserInformationById);
router.put("/myAccount/update/:idNhanVien", qlThonTin.updateInformationUserById);
router.post("/login-account", qlThonTin.loginAccount);
router.put("/changePass/:idNhanVien", qlThonTin.updatePasswordById);

module.exports = router;
