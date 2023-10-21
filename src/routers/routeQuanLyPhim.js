const express=require('express');
const router=express.Router();

const qlPhim=require('../app/controller/quanLyPhim');
const authMiddleware=require('../middleware/authMiddleware');

router.get('/quanlyphim/phim',authMiddleware,qlPhim.getdsPhim);
router.get('/quanlyphim/phimdachieu',authMiddleware,qlPhim.getdsPhimDaChieu);
router.get('/quanlyphim/phim/them',authMiddleware,qlPhim.getThemPhim)
router.get('/quanlyphim/phimdachieu/:idPhim',authMiddleware,qlPhim.chiTietPhimDaChieu);
router.put('/quanlyphim/phimdachieu/:idPhim',authMiddleware,qlPhim.xoaPhimDaChieu);

router.post('/quanlyphim/phim/them/luu',authMiddleware,qlPhim.themPhim)
router.put('/quanlyphim/phim/xoa/:idPhim',authMiddleware,qlPhim.xoaPhim)
router.get('/quanlyphim/phim/capnhat/:idPhim',authMiddleware,qlPhim.getCapNhatPhim)

module.exports=router;
