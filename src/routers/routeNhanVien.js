const express = require('express');
const router = express.Router();

const qlNhanVien = require('../app/controller/quanLyNhanVien');
const authMiddleware=require('../middleware/authMiddleware');

router.get('/nhanVien',authMiddleware,qlNhanVien.getAllNhanVien);

router.post('/nhanvien/them/luu', qlNhanVien.addEmployee);
router.get('/nhanvien/them',qlNhanVien.getAddNhanVien)
router.put('/nhanvien/luutru/:idNhanVien',qlNhanVien.deleteEmployee)
router.get('/nhanvien/sua/:id',qlNhanVien.getUpdateEmployee)
router.put('/nhanvien/sua/luu/:idNhanVien',qlNhanVien.updateEmployee)

module.exports=router;