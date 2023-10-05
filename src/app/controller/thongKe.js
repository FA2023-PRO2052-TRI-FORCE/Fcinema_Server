class thongKe{
    async dsThongKe(req,res){
        res.render('thongKe', { title: 'Thống kê' });
    }

}
module.exports=new thongKe();