const express=require('express');
const router=express.Router();

const ticket=require('../app/controller/ticketController');

router.get('/ve',ticket.getAllVeDaDat);
router.get('/ve/them',ticket.getNewVe);
router.post('/ve/them/luu',ticket.insertNewVe);
router.get('/ve/chitiet/:idVe',ticket.getChiTietVe);
router.put('/ve/chitiet/:idVe',ticket.updateTrangThaiVe)


module.exports=router;