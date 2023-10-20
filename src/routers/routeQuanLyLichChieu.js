const express=require('express');
const router=express.Router();

const qlLichChieu=require('../app/controller/quanLyLichChieu');
const authMiddleware=require('../middleware/authMiddleware');

router.get('/lichchieu',authMiddleware,qlLichChieu.getAllLichChieu);
router.get('/lichchieu/them',authMiddleware,qlLichChieu.getNewLichChieu);
router.post('/lichchieu/them/luu',authMiddleware,qlLichChieu.addNewLichChieu);
router.get('/lichchieu/sua/:idLichChieu',authMiddleware,qlLichChieu.getChiTietLichChieu);
router.post('/lichchieu/tim/:tenPhim',authMiddleware,qlLichChieu.searchLichChieu);
router.put('/lichchieu/sua/luu/:idLichChieu',authMiddleware,qlLichChieu.updateLichChieu);
router.put('/lichchieu/luutru/:idLichChieu',authMiddleware,qlLichChieu.deleteLichChieu);




module.exports=router;