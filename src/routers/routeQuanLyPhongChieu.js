const express=require('express');
const router=express.Router();

const phongChieu=require('../app/controller/quanLyPhongChieu');


router.get('/phongChieu',phongChieu.getAllPhongChieu)
router.put('/phongchieu/:idPhongChieu',phongChieu.updatePhongChieu);



module.exports=router;
