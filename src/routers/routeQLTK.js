const express=require('express');
const router=express.Router();

const qlThonTin=require('../app/controller/quanlythongtin');


router.get('/managerAdmin',qlThonTin.goToManager)
router.get('/changePassAdmin',qlThonTin.goToChangePass)



module.exports=router;
