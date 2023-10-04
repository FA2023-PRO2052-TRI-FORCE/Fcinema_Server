const express=require('express');
const router=express.Router();

const tk=require('../app/controller/thongKe');

router.get('/thongke',tk.dsThongKe);

module.exports=router;