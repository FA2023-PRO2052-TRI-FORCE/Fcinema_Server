const express = require('express');
const router = express.Router();

const qlNhanVien = require('../app/controller/quanLyNhanVien');

router.get('/nhanVien',qlNhanVien.goToScreen);
router.post('/nhanvien/them/luu', qlNhanVien.addEmployee);
router.get('/nhanvien/them',qlNhanVien.add)
router.put('/nhanvien/luutru/:idNhanVien',qlNhanVien.deleteEmployee)
router.get('/nhanvien/sua/:id',qlNhanVien.getUpdateEmployee)
router.post('/nhanvien/sua/luu/:id',qlNhanVien.updateEmployee)

module.exports=router;