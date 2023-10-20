const express = require('express');
const router = express.Router();

const qlNhanVien = require('../app/controller/quanLyNhanVien');
const authMiddleware=require('../middleware/authMiddleware');

router.get('/nhanVien',authMiddleware,qlNhanVien.goToScreen);
router.get('/nhanvien/themNhanVien',authMiddleware,qlNhanVien.goToAdd);


module.exports=router;