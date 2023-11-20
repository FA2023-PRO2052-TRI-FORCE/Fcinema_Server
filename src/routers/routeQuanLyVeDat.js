const express=require('express');
const router=express.Router();

const veDat=require('../app/controller/quanLyVeDat');

router.get('/ve',veDat.getAllVeDaDat);
router.get('/ve/them',veDat.getNewVe);
router.post('/ve/them/luu',veDat.addNewVe);
router.get('/ve/chitiet/:idVe',veDat.getChiTetVe);
router.get('/ve/them/ghe',veDat.getAllGheDaChon);
router.put('/ve/chitiet/:idVe',veDat.updateTrangThaiVe)


module.exports=router;