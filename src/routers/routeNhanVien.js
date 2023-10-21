const express = require('express');
const router = express.Router();

const qlNhanVien = require('../app/controller/quanLyNhanVien');
const authMiddleware=require('../middleware/authMiddleware');

router.get('/nhanVien',authMiddleware,qlNhanVien.goToScreen);
router.get('/nhanvien/themNhanVien',authMiddleware,qlNhanVien.add);

router.post('/nhanvien/them/luu', qlNhanVien.addEmployee);
router.get('/nhanvien/them',qlNhanVien.add)
router.put('/nhanvien/luutru/:idNhanVien',qlNhanVien.deleteEmployee)
router.get('/nhanvien/sua/:id',qlNhanVien.getUpdateEmployee)
router.post('/nhanvien/sua/luu/:id',qlNhanVien.updateEmployee)

module.exports=router;