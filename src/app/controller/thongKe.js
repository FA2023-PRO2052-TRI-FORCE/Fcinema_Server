const { json } = require('body-parser');
const ThongKeModel=require('../model/thongKeModel')
class thongKe{
    async getThongKe(req,res){
        const hoTenND=req.session.user[0].hoTen;
        const anhND=req.session.user[0].anh;  
        
        const thongKeModel=new ThongKeModel();
        try {
            let dates,totalVe,namProduct,quantityOfProduct,totalMoney,totalMoneyMonth,totalVeMonth;
            [totalVe,dates,namProduct,quantityOfProduct,totalMoney,totalMoneyMonth,totalVeMonth] = await Promise.all([
                thongKeModel.getVeStatisticsFor7days(),
                thongKeModel.getDateStatisticsFor7days(),
                thongKeModel.getNameProduct(),
                thongKeModel.getQuantityProduct(),
                thongKeModel.getToTalRevenueVeStatisticsFor7days(),
                thongKeModel.getStatistics12RevenueMonths(),
                thongKeModel.getStatisticsVe12Months()

              ]);

            const extractedquantityOfProduct = quantityOfProduct.map(item => item.tong);
            const extractednamProduct = namProduct.map(item => item.tenDoAn);
            const extractedTotalMoneyMonth = totalMoneyMonth.map(item => item.TongDoanhThu);
            const extractedTotalVeMonth = totalVeMonth.map(item => item.tong);
            const extractedTotalMoneyWeek = totalMoney.map(item => item.tong);

            
            res.render('others/thongKe', { 
                title: 'Thống kê',
                anhND:anhND,
                hoTenND:hoTenND,
                dates:JSON.parse(JSON.stringify(dates)),
                totalVe:totalVe,
                nameProduct:extractednamProduct,
                quantityOfProduct:extractedquantityOfProduct,
                totalMoney:extractedTotalMoneyWeek,
                totalMoneyMonth:extractedTotalMoneyMonth,
                totalVeMonth:extractedTotalVeMonth
             });
        } catch (error) {
            console.log('Lỗi',error)
        }

    }

}
module.exports=new thongKe();