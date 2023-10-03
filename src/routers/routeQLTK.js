const express=require('express');
const router=express.Router();

const qlThonTin=require('../app/controller/quanlythongtin');


router.get('/managerAdmin',qlThonTin.goToManager)



module.exports=router;
