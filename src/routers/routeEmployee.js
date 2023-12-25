const express = require('express');
const router = express.Router();

const emp = require('../app/controller/employeeController');
const authMiddleware=require('../middleware/authMiddleware');

router.get('/nhanVien',authMiddleware,emp.getAllNhanVien);

router.post('/nhanvien/them/luu', emp.insertNewNhanVien);
router.get('/nhanvien/them',emp.getAddNhanVien)
router.put('/nhanvien/luutru/:idNhanVien',emp.deleteNhanVienById)
router.get('/nhanvien/sua/:id',emp.getNhanVienById)
router.put('/nhanvien/sua/luu/:idNhanVien',emp.updateNhanVienById)

module.exports=router;