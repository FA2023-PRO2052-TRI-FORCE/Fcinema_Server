const express=require('express');
const router=express.Router();

const qlPhim=require('../app/controller/quanLyPhim');

router.get('/quanlyphim/phim',qlPhim.dsPhim);
router.get('/quanlyphim/phimdachieu',qlPhim.dsPhimDaChieu);
router.get('/login',qlPhim.gotoLogin)
router.get('/tongquan',qlPhim.tongQuan)
router.get('/quanlyphim/phim/them',qlPhim.themPhim)
router.get('/quanlyphim/phimdachieu/:idPhim',qlPhim.chiTietPhimDaChieu);
router.put('/quanlyphim/phimdachieu/:idPhim',qlPhim.xoaPhimDaChieu);




module.exports=router;
