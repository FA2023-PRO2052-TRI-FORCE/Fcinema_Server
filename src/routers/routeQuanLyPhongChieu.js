const express=require('express');
const router=express.Router();

const qlPhongChieu=require('../app/controller/quanLyPhongChieu');


router.get('/phongChieu',qlPhongChieu.goToScreen)




module.exports=router;
