const express=require('express');
const router=express.Router();

const showtime=require('../app/controller/showtimeController');
const authMiddleware=require('../middleware/authMiddleware');

router.get('/lichchieu',authMiddleware,showtime.getAllLichChieu);
router.get('/lichchieu/them',authMiddleware,showtime.getNewLichChieu);
router.post('/lichchieu/them/luu',authMiddleware,showtime.addNewLichChieu);
router.get('/lichchieu/sua/:idLichChieu',authMiddleware,showtime.getChiTietLichChieu);
router.post('/lichchieu/tim/:tenPhim',authMiddleware,showtime.searchLichChieu);
router.put('/lichchieu/sua/luu/:idLichChieu',authMiddleware,showtime.updateLichChieu);
router.put('/lichchieu/luutru/:idLichChieu',authMiddleware,showtime.deleteLichChieu);




module.exports=router;