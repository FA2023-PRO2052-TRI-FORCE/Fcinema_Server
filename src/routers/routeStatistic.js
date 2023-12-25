const express=require('express');
const router=express.Router();

const statistic=require('../app/controller/statisticController');
const authMiddleware=require('../middleware/authMiddleware');

router.get('/thongke',authMiddleware,statistic.getThongKe);

module.exports=router;