# FALL23/PRO2052/MD17302/PRO2052-TRIFORCE
# FCinema Server
FCinema Server là một web server để quản lý rạp phim. Web server sử dụng Node.js, Handlebars template, Bootstrap 5 và Java cho phía [client](https://github.com/DoannNguyen/FCINEMA_App). Database sử dụng là MySQL. Cloud sử dụng để lưu trữ ảnh là Cloudinary.

## Thành viên

| STT | Họ và tên | Task|
|---|---| --- |
| 1 | Nguyễn Văn Đoàn |Viết API cho liên quan đến chức năng phim - vé cho phía client.
| 2 | A Hà Anh Tú | Quản lý loại phim - phim, quản lý nhân viên, tài khoản.
| 3 | Trần Duy Tặng |Giao diện cho phần đăng nhập, phòng chiếu, khách hàng (1).
| 4 | Lô Tiến Đạt  |Vé đặt, thống kê, sản phẩm, baner, viết mã cho các chức năng (1), viết API liên quan đến tài khoản của người dùng phía client.

## Chức năng chính
1. Đăng nhập, phân quyền (Admin có thể thực hiện được tất cả các chức năng, nhân viên chỉ có thể thực hiện chức năng vé đặt và tài khoản)
2. Thêm, xem, cập nhật, xoá loại phim-phim cho hệ thống
3. Thêm, xem, cập nhật, xoá sản phẩm cho hệ thống
4. Thêm, xem, cập nhật lịch chiếu cho hệ thống
5. Thêm vé đặt cho khách hàng mua vé tại quầy, xem chi tiết vé đặt, xem danh sách vé đặt
6. Thống kê doanh thu (qua 12 tháng, qua tháng, qua 7 ngày) và các thống kê liên quan (tồn kho sản phẩm, phim, lịch chiếu, vé...)
7. Thêm, xem, xoá nhân viên cho rạp
8. Thay đổi thông tin, mật khẩu cá nhân
9. Phân trang, lọc, tìm kiếm các thông tin cho từng nhóm chức năng sử dụng datatable bootstrap
10. Hiển thị thông báo khi thực hiện thành công, hoặc thất bại 1 một chức năng

## Một số giao diện

| |
|---|
|![Giao diện màn hình đăng nhập](./src/resources/img/readme/1.png)<h4 align="center">Giao diện màn hình đăng nhập</h4> |
![Giao diện màn hình tổng quan](./src/resources/img/readme/2.png)<h4 align="center">Giao diện màn hình tổng quan</h4> |
![Giao diện màn hình tổng quan](./src/resources/img/readme/19.png)<h4 align="center">Giao diện màn hình tổng quan (chi tiết phần thống kê)</h4> |
![Giao diện màn hình vé đặt](./src/resources/img/readme/12.png)<h4 align="center">Giao diện màn hình vé đặt</h4> |
![Giao diện màn hình thêm vé đặt](./src/resources/img/readme/13.png)<h4 align="center">Giao diện màn hình thêm vé đặt</h4> |
![Giao diện màn hình thêm vé đặt](./src/resources/img/readme/14.png)<h4 align="center">Giao diện màn hình thêm vé đặt</h4> |
![Giao diện màn hình chi tiết vé đặt](./src/resources/img/readme/15.png)<h4 align="center">Giao diện màn hình chi tiết vé đặt</h4> |
![Giao diện màn hình phim](./src/resources/img/readme/7.png)<h4 align="center">Giao diện màn hình phim</h4> |
![Giao diện màn hình lịch chiếu](./src/resources/img/readme/10.png)<h4 align="center">Giao diện màn hình lịch chiếu</h4> |
![Giao diện màn hình sản phẩm](./src/resources/img/readme/3.png)<h4 align="center">Giao diện màn hình sản phẩm</h4> |
![Giao diện màn hình nhân viên](./src/resources/img/readme/17.png)<h4 align="center">Giao diện màn hình nhân viên</h4> |
![Giao diện màn hình tài khoản](./src/resources/img/readme/20.png)<h4 align="center">Giao diện màn hình tài khoản</h4> |
![Giao diện modal đổi mật khẩu ](./src/resources/img/readme/21.png)<h4 align="center">Giao diện modal đổi mật khẩu </h4> |
![Giao diện màn hình thêm phim](./src/resources/img/readme/8.png)<h4 align="center">Giao diện màn hình thêm phim/h4> |
![Giao diện màn hình thêm lịch chiếu](./src/resources/img/readme/11.png)<h4 align="center">Giao diện màn hình thêm lịch chiếu/h4> |
![Giao diện modal thêm ](./src/resources/img/readme/5.png)<h4 align="center">Giao diện modal thêm</h4> |
![Giao diện modal xoá ](./src/resources/img/readme/22.png)<h4 align="center">Giao diện modal xoá</h4> |
