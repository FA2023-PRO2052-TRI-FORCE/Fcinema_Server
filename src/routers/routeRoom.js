const express=require('express');
const router=express.Router();

const room=require('../app/controller/roomController');
const authMiddleware=require('../middleware/authMiddleware');


router.get('/phongChieu',authMiddleware,room.getAllPhongChieu)
router.put('/phongchieu/:idPhongChieu',authMiddleware,room.updatePhongChieu);



module.exports=router;
