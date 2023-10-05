class lichChieu{
    async dsLichChieu(req,res){
        res.render('lichChieu', { title: 'Lịch Chiếu Phim' })
    }
    async themLichChieu(req,res){
        res.render('themLichChieu', { title: 'Thêm Lịch Chiếu Phim' })
    }

}
module.exports=new lichChieu();