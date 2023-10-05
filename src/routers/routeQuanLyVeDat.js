const express=require('express');
const router=express.Router();

const veDat=require('../app/controller/quanLyVeDat');

router.get('/ve',veDat.dsVeDaDat);
router.get('/ve/them',veDat.themVeMoi);

module.exports=router;