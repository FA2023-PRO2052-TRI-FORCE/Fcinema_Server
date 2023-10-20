const express=require('express');
const router=express.Router();

const qlThonTin=require('../app/controller/quanlythongtin');

router.get('/login',qlThonTin.gotoLogin)
router.get('/tongquan',qlThonTin.tongQuan)
router.get('/managerAdmin',qlThonTin.goToManager)
router.get('/changePassAdmin',qlThonTin.goToChangePass)
router.post('/login-account',qlThonTin.loginAccount);
router.put('/changePass/:idNhanVien',qlThonTin.changePasswordUser);



module.exports=router;
