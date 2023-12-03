const express=require('express');
const router=express.Router();

const phongChieu=require('../app/controller/quanLyPhongChieu');
const authMiddleware=require('../middleware/authMiddleware');


router.get('/phongChieu',authMiddleware,phongChieu.getAllPhongChieu)
router.put('/phongchieu/:idPhongChieu',authMiddleware,phongChieu.updatePhongChieu);



module.exports=router;
