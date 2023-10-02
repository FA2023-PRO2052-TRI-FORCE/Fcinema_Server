const express=require('express');
const router=express.Router();

const qlPhim=require('../app/controller/quanLyPhim');

router.get('/phim/quanlyphim',qlPhim.getDSPhim);
router.get('/login',qlPhim.gotoLogin)
router.get('/phim/loaiphim',qlPhim.gotoQLLP)
router.get('/tongquan',qlPhim.goToTQ)



module.exports=router;