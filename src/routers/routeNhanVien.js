const express = require('express');
const router = express.Router();

const qlNhanVien = require('../app/controller/quanLyNhanVien');

router.get('/nhanVien',qlNhanVien.goToScreen);
router.get('/nhanvien/themNhanVien',qlNhanVien.goToAdd);


module.exports=router;