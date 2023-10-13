const express=require('express');
const router=express.Router();

const veDat=require('../app/controller/quanLyVeDat');

router.get('/ve',veDat.getAllVeDaDat);
router.get('/ve/them',veDat.addNewVe);

module.exports=router;