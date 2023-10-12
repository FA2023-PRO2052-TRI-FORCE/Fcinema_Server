const express=require('express');
const router=express.Router();

const qlLichChieu=require('../app/controller/quanLyLichChieu');

router.get('/lichchieu',qlLichChieu.getAllLichChieu);
router.get('/lichchieu/them',qlLichChieu.getNewLichChieu);
router.post('/lichchieu/them/luu',qlLichChieu.addNewLichChieu);
router.get('/lichchieu/sua/:idLichChieu',qlLichChieu.getChiTietLichChieu);
router.post('/lichchieu/tim/:tenPhim',qlLichChieu.searchLichChieu);
router.put('/lichchieu/sua/luu/:idLichChieu',qlLichChieu.updateLichChieu);
router.put('/lichchieu/luutru/:idLichChieu',qlLichChieu.deleteLichChieu);




module.exports=router;