class thongKe{
    async dsThongKe(req,res){
        const hoTenND=req.session.user[0].hoTen;
        const anhND=req.session.user[0].anh;        
        res.render('others/thongKe', { 
            title: 'Thống kê',
            anhND:anhND,
            hoTenND:hoTenND,
         });
    }

}
module.exports=new thongKe();