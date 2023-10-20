const express=require('express');
const router=express.Router();

const qlPhim=require('../app/controller/quanLyPhim');
const authMiddleware=require('../middleware/authMiddleware');

router.get('/quanlyphim/phim',authMiddleware,qlPhim.dsPhim);
router.get('/quanlyphim/phimdachieu',authMiddleware,qlPhim.dsPhimDaChieu);
router.get('/quanlyphim/phim/them',authMiddleware,qlPhim.themPhim)
router.get('/quanlyphim/phimdachieu/:idPhim',authMiddleware,qlPhim.chiTietPhimDaChieu);
router.put('/quanlyphim/phimdachieu/:idPhim',authMiddleware,qlPhim.xoaPhimDaChieu);




module.exports=router;
