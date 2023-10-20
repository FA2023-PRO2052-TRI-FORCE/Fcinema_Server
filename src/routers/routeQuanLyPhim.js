const express=require('express');
const router=express.Router();

const qlPhim=require('../app/controller/quanLyPhim');

router.get('/quanlyphim/phim',qlPhim.dsPhim);
router.get('/quanlyphim/phimdachieu',qlPhim.dsPhimDaChieu);
router.get('/login',qlPhim.gotoLogin)
router.get('/tongquan',qlPhim.tongQuan)
router.get('/quanlyphim/phimdachieu/:idPhim',qlPhim.chiTietPhimDaChieu);
router.put('/quanlyphim/phimdachieu/:idPhim',qlPhim.xoaPhimDaChieu);

router.get('/quanlyphim/phim/them',qlPhim.getThemPhim)
router.post('/quanlyphim/phim/them/luu',qlPhim.themPhim)
router.put('/quanlyphim/phim/xoa/:idPhim',qlPhim.xoaPhim)
router.get('/quanlyphim/phim/capnhat/:idPhim',qlPhim.getCapNhatPhim)

module.exports=router;
