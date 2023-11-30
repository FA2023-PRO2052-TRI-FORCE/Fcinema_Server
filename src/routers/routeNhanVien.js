const express = require('express');
const router = express.Router();

const qlNhanVien = require('../app/controller/quanLyNhanVien');
const authMiddleware=require('../middleware/authMiddleware');

router.get('/nhanVien',authMiddleware,qlNhanVien.getAllNhanVien);

router.post('/nhanvien/them/luu', qlNhanVien.insertNewNhanVien);
router.get('/nhanvien/them',qlNhanVien.getAddNhanVien)
router.put('/nhanvien/luutru/:idNhanVien',qlNhanVien.deleteNhanVienById)
router.get('/nhanvien/sua/:id',qlNhanVien.getNhanVienById)
router.put('/nhanvien/sua/luu/:idNhanVien',qlNhanVien.updateNhanVienById)

module.exports=router;