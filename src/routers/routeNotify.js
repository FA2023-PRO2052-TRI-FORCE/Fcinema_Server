const express=require('express');
const router=express.Router();

const notify=require('../app/controller/notificationController');

router.get('/thongbao',notify.getNotify);

module.exports=router;