class thongKe{
    async dsThongKe(req,res){
        res.render('others/thongKe', { title: 'Thống kê' });
    }

}
module.exports=new thongKe();