const express = require("express");
const router = express.Router();

const qlThonTin = require("../app/controller/quanlythongtin");

router.get("/login", qlThonTin.gotoLogin);
router.get("/logout", qlThonTin.logoutAccount);
router.get("/tongquan", qlThonTin.getTongQuan);
router.get("/myAccount", qlThonTin.gotoAccount);
router.put("/myAccount/update/:idNhanVien", qlThonTin.updateProfile);
router.get("/changePass", qlThonTin.goToChangePass);
router.post("/login-account", qlThonTin.loginAccount);
router.put("/changePass/:idNhanVien", qlThonTin.changePasswordUser);

module.exports = router;
