const express=require('express');
const router=express.Router();

const user=require('../app/controller/userController');
const authMiddleware=require('../middleware/authMiddleware');

router.get('/khachhang',authMiddleware,user.getListKhachHang)
router.get('/khachhang/:email',authMiddleware,user.getKhachHangByEmail)
router.put('/khachhang/:email',authMiddleware,user.updateTrangThaiKhachHang)




module.exports=router;
