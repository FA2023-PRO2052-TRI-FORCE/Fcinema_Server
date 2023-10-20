const express=require('express');
const router=express.Router();

const qlPhim=require('../app/controller/quanLyPhim');
const authMiddleware=require('../middleware/authMiddleware');

router.get('/quanlyphim/phim',authMiddleware,qlPhim.dsPhim);
router.get('/quanlyphim/phimdachieu',authMiddleware,qlPhim.dsPhimDaChieu);
router.get('/quanlyphim/phim/them',authMiddleware,qlPhim.themPhim)
router.get('/quanlyphim/phimdachieu/:idPhim',authMiddleware,qlPhim.chiTietPhimDaChieu);
router.put('/quanlyphim/phimdachieu/:idPhim',authMiddleware,qlPhim.xoaPhimDaChieu);


router.get('/quanlyphim/phim/them',qlPhim.getThemPhim)
router.post('/quanlyphim/phim/them/luu',qlPhim.themPhim)
router.put('/quanlyphim/phim/xoa/:idPhim',qlPhim.xoaPhim)
router.get('/quanlyphim/phim/capnhat/:idPhim',qlPhim.getCapNhatPhim)

module.exports=router;
