const express=require('express');
const router=express.Router();

const qlThonTin=require('../app/controller/quanlythongtin');


router.get('/managerAdmin',qlThonTin.goToManager)
router.post('/managerAdmin/update/:idNhanVien', qlThonTin.updateProfile);
router.get('/changePassAdmin',qlThonTin.goToChangePass)


module.exports=router;
