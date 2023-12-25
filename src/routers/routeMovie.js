const express=require('express');
const router=express.Router();

const movie=require('../app/controller/movieController');
const authMiddleware=require('../middleware/authMiddleware');

router.get('/quanlyphim/phim',authMiddleware,movie.getPhims);

router.get('/quanlyphim/phim/them',authMiddleware,movie.getAddNewPhim)
router.post('/quanlyphim/phim/them/luu',authMiddleware,movie.insertNewPhim)
router.put('/quanlyphim/phim/xoa/:idPhim',authMiddleware,movie.deletePhim)
router.get('/quanlyphim/phim/capnhat/:idPhim',authMiddleware,movie.getUpdatePhim)
router.put('/quanlyphim/phim/capnhat/:idPhim',authMiddleware,movie.updatePhim);

module.exports=router;
