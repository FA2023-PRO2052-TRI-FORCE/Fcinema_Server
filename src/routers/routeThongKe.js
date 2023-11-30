const express=require('express');
const router=express.Router();

const thongKe=require('../app/controller/thongKe');
const authMiddleware=require('../middleware/authMiddleware');

router.get('/thongke',authMiddleware,thongKe.getThongKe);

module.exports=router;