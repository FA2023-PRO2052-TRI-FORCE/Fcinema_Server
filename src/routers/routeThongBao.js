const express=require('express');
const router=express.Router();

const qlThongBao=require('../app/controller/quanLyThongBao');

router.get('/thongbao',qlThongBao.dsThongBao);

module.exports=router;