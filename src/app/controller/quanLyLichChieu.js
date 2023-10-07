class lichChieu{
    async dsLichChieu(req,res){
        res.render('showtimes/lichChieu', { title: 'Lịch Chiếu Phim' })
    }
    async themLichChieu(req,res){
        res.render('showtimes/themLichChieu', { title: 'Thêm Lịch Chiếu Phim' })
    }

}
module.exports=new lichChieu();