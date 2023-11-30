const express=require('express');
const router=express.Router();

const veDat=require('../app/controller/quanLyVeDat');

router.get('/ve',veDat.getAllVeDaDat);
router.get('/ve/them',veDat.getNewVe);
router.post('/ve/them/luu',veDat.insertNewVe);
router.get('/ve/chitiet/:idVe',veDat.getChiTietVe);
router.put('/ve/chitiet/:idVe',veDat.updateTrangThaiVe)


module.exports=router;