const express = require("express");
const router = express.Router();

const account = require("../app/controller/accountController");

router.get("/login", account.getLoginPage);
router.get("/logout", account.logoutAccount);
router.get("/tongquan", account.getTongQuan);
router.get("/myAccount", account.getUserInformationById);
router.put("/myAccount/update/:idNhanVien", account.updateInformationUserById);
router.post("/login-account", account.loginAccount);
router.put("/changePass/:idNhanVien", account.updatePasswordById);

module.exports = router;
