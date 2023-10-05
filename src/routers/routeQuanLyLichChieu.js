const express=require('express');
const router=express.Router();

const qlLichChieu=require('../app/controller/quanLyLichChieu');

router.get('/lichchieu',qlLichChieu.dsLichChieu);
router.get('/lichchieu/them',qlLichChieu.themLichChieu);


module.exports=router;