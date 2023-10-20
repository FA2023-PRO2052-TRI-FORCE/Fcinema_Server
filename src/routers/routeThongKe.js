const express=require('express');
const router=express.Router();

const tk=require('../app/controller/thongKe');
const authMiddleware=require('../middleware/authMiddleware');

router.get('/thongke',authMiddleware,tk.dsThongKe);

module.exports=router;