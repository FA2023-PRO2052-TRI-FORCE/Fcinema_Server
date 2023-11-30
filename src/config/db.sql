
-- DÁN ĐOẠN CODE NÀY LÊN MYSQL XAMPP: ĐẦU TIÊN LÀ DÁN ĐOẠN MÃ TẠO DATABASE TRƯỚC XONG RỒI VÔ DATABASE ĐÓ DÁN MẤY CÂU LỆNH TẠO BẢNG VS DỮ LIỆU MẪU, DỮ LIỆU MẪU TỰ NGHĨ NHA

CREATE DATABASE `f_cinema`;



CREATE TABLE IF NOT EXISTS `NguoiDung`(
    `email` varchar(255) PRIMARY KEY NOT NULL,
    `hoTen` varchar(255) DEFAULT NULL,
    `matKhau` varchar(255) NOT NULL,
    `dienThoai` varchar(255) DEFAULT NULL,
    `anh` LongText DEFAULT NULL,
    `ngaySinh` date DEFAULT NULL,
    `diaChi` varchar(255) DEFAULT NULL,
    `hienThi` INT DEFAULT NULL
);
CREATE TABLE IF NOT EXISTS`NhanVien`(
    `idNhanVien` varchar(255) PRIMARY KEY NOT NULL,
    `hoTen` varchar(255) DEFAULT NULL,
    `matKhau` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,    
    `dienThoai` varchar(255) DEFAULT NULL,
    `anh` LongText DEFAULT NULL,
    `vaiTro`VARCHAR(255),
    `ngaySinh` date DEFAULT NULL,
    `diaChi` varchar(255) DEFAULT NULL,
    `gioiTinh` varchar(255) DEFAULT NULL,
    `hienThi` INT DEFAULT NULL 
);
CREATE TABLE IF NOT EXISTS`TheLoai`(
    `idTheLoai`  INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    `tenTheLoai` varchar(255) NOT NULL,
    `hienThi` INT DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS`Phim`(
    `idPhim`  INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    `tenPhim` varchar(255) NOT NULL,
    `anh` LongText NOT NULL,
    `ngonNgu` VARCHAR(255) NOT NULL,
    `moTa` mediumtext NOT NULL,
    `hangSX` VARCHAR(255) NOT NULL,
    `nuocSX` VARCHAR(255) NOT NULL,
    `namSX` VARCHAR(255) NOT NULL,
    `thoiLuong` VARCHAR(255) NOT NULL,
    `daoDien` VARCHAR(255) NOT NULL,
    `trangThai` INT DEFAULT NULL,
    `hienThi` INT DEFAULT NULL,
    `idTheLoai` INT NOT NULL,
    FOREIGN KEY (idTheLoai) REFERENCES TheLoai(idTheLoai)
);
CREATE TABLE IF NOT EXISTS`PhongChieu`(
    `idPhongChieu`  INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    `tenPhongChieu` varchar(255) NOT NULL,
    `soLuongGhe` INT NOT NULL,
    `trangThai` INT
);
CREATE TABLE IF NOT EXISTS`LichChieu`(
    `idLichChieu`  INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    `ngayChieu` DATE NOT NULL,
    `caChieu` varchar(255) NOT NULL,
    `giaPhim` Float not null,
    `ngayThem` DATE NOT NULL,
    `hienThi` INT DEFAULT NULL,
    `idPhongChieu` INT NOT NULL,
    `idPhim`  INT NOT NULL,
    FOREIGN KEY (idPhim) REFERENCES Phim(idPhim),
    FOREIGN KEY (idPhongChieu) REFERENCES PhongChieu(idPhongChieu)
);
CREATE TABLE IF NOT EXISTS`Ve`(
    `idVe` VARCHAR(255) PRIMARY KEY NOT NULL ,
    `soVe` int NOT NULL,
    `ngayMua` DATE NOT NULL,
    `tongTien` FLOAT NOT NULL,
    `ngayThanhToan` DATE NOT NULL,
    `trangThai` INT NOT NULL,
    `phuongThucTT`  VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) ,
    `idNhanVien` varchar(255) ,
    `idLichChieu` INT NOT NULL,
    FOREIGN KEY (`email`) REFERENCES NguoiDung(`email`),
    FOREIGN KEY (`idNhanVien`) references NhanVien(`idNhanVien`),
    FOREIGN KEY (`idLichChieu`) references LichChieu(`idLichChieu`)

);

CREATE TABLE IF NOT EXISTS`ViTriGhe`(
    `idViTriGhe`  INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    `tenGhe` JSON NOT NULL,
    `trangThai` INT NOT NULL,
    `idPhongChieu` INT NOT NULL,
    `idVe`  VARCHAR(255),
    FOREIGN KEY (`idPhongChieu`) REFERENCES `PhongChieu`(`idPhongChieu`),
    FOREIGN KEY (`idVe`) REFERENCES Ve(`idVe`) 
);
 
CREATE TABLE IF NOT EXISTS`ThongBao`(
    `idTB` int auto_increment PRIMARY KEY NOT NULL,
    `noiDung` VARCHAR(255) NOT NULL,
    `thoiGian` DATE,
    `trangThai` INT 
);

-- DỮ LIỆU MẪU CHO BẢNG NHÂN VIÊN
INSERT INTO NhanVien (idNhanVien, hoTen, matKhau, dienThoai, vaiTro, ngaySinh, diaChi, gioiTinh, hienThi)
VALUES
    ('NV001', 'Nguyễn Văn A', '123456', '0987654321', 'Nhân viên', '1990-01-01', 'Hà Nội', 'Nam', 1),
    ('NV002', 'Trần Thị B', '654321', '0123456789', 'Nhân viên', '1991-02-02', 'Hồ Chí Minh', 'Nữ', 1),
    ('Admin', 'Lê Văn C', '213456', '0987654320', 'admin', '1992-03-03', 'Đà Nẵng', 'Nam', 1),
    ('NV004', 'Đinh Thị D', '321456', '0123456788', 'Nhân viên', '1993-04-04', 'Cần Thơ', 'Nữ', 1),
    ('NV005', 'Phạm Văn E', '4321456', '0987654327', 'Nhân viên', '1994-05-05', 'Hải Phòng', 'Nam', 1);
--  DỮ LIỆU MẪU THỂ LOẠI PHIM
INSERT INTO TheLoai (tenTheLoai) VALUES
('Hành động'),
('Chính kịch'),
('Trinh thám');
--Dữ liệu mẫu của PHIM
INSERT INTO Phim (tenPhim, anh, ngonNgu, moTa, hangSX, nuocSX, namSX, thoiLuong, daoDien, idTheLoai,hienThi,trangThai) VALUES
('The Nun II', '', 'Tiếng Anh', 'Đây là mô tả của phim 1', 'Hãng sản xuất 1', 'Nước sản xuất 1', '2023', '120 phút', 'Đạo diễn 1', 1,1,1),
('Avenger', '', 'Tiếng Anh', 'Đây là mô tả của phim 2', 'Hãng sản xuất 2', 'Nước sản xuất 2', '2022', '100 phút', 'Đạo diễn 2', 2,1,1),
('Trivio', '', 'Tiếng Nhật', 'Đây là mô tả của phim 3', 'Hãng sản xuất 3', 'Nước sản xuất 3', '2021', '90 phút', 'Đạo diễn 3', 3,1,1);
INSERT INTO Phim (tenPhim, anh, ngonNgu, moTa, hangSX, nuocSX, namSX, thoiLuong, daoDien, idTheLoai, hienThi, trangThai) VALUES
('Avatar (2009)', '', 'Tiếng Anh', 'Đây là mô tả của phim 1', 'Hãng sản xuất 1', 'Nước sản xuất 1', '2009', '162 phút', 'James Cameron', 1, 1, 1),
('Biệt Đội Siêu Anh Hùng - The Avengers (2012 - 2019)', '', 'Tiếng Anh', 'Đây là mô tả của phim 2', 'Hãng sản xuất 2', 'Nước sản xuất 2', '2012', '143 phút', 'Joss Whedon', 2, 1, 1),
('Kẻ Huỷ Diệt - The Terminator (1984)', '', 'Tiếng Anh', 'Đây là mô tả của phim 3', 'Hãng sản xuất 3', 'Nước sản xuất 3', '1984', '107 phút', 'James Cameron', 3, 1, 1),
('Ma Trận - The Matrix (1999)', '', 'Tiếng Anh', 'Đây là mô tả của phim 4', 'Hãng sản xuất 4', 'Nước sản xuất 4', '1999', '136 phút', 'The Wachowskis', 1, 1, 1),
('Fast & Furious (2001)', '', 'Tiếng Anh', 'Đây là mô tả của phim 5', 'Hãng sản xuất 5', 'Nước sản xuất 5', '2001', '106 phút', 'Rob Cohen', 2, 1, 1),
('Nhà tù Shawshank - The Shawshank Redemption(1994)', '', 'Tiếng Anh', 'Đây là mô tả của phim 6', 'Hãng sản xuất 6', 'Nước sản xuất 6', '1994', '142 phút', 'Frank Darabont', 3, 1, 1),
('Những Kẻ Khờ Mộng Mơ - La La Land (2016)', '', 'Tiếng Anh', 'Đây là mô tả của phim 7', 'Hãng sản xuất 7', 'Nước sản xuất 7', '2016', '128 phút', 'Damien Chazelle', 1, 1, 1);

--  DỮ LIỆU MẪU CỦA PHÒNG CHHIẾU
INSERT INTO PhongChieu (tenPhongChieu, soLuongGhe, trangThai)
VALUES ('Phòng 1', 20, 1),
       ('Phòng 2', 20, 0),
       ('Phòng 3', 20, 1),
       ('Phòng 4', 20, 1),
       ('Phòng 5', 30, 0),
       ('Phòng 6', 40, 1);
    --    DỮ LIỆU MẪU BẢNG NGƯỜI DÙNG 
    INSERT INTO NguoiDung (email, hoTen, matKhau, dienThoai, anh, ngaySinh, diaChi, hienThi)
VALUES
    ('nguoidung1@example.com', 'Người dùng 1', '123456', '0123456789', NULL, '2000-01-01', 'Hà Nội', 1),
    ('nguoidung2@example.com', 'Người dùng 2', '654321', '0987654321', NULL, '2001-02-02', 'Hồ Chí Minh', 1),
    ('nguoidung3@example.com', 'Người dùng 3', 'abcdef', '01234567890', NULL, '2002-03-03', 'Đà Nẵng', 1),
    ('nguoidung4@example.com', 'Người dùng 4', 'qwerty', '09876543210', NULL, '2003-04-04', 'Hải Phòng', 1),
    ('nguoidung5@example.com', 'Người dùng 5', 'zxcvbn', '012345678901', NULL, '2004-05-05', 'Cần Thơ', 1);

-- ĐỒ ĂN
CREATE TABLE IF NOT EXISTS`DoAn`(
    `idDoAn`  INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    `tenDoAn` VARCHAR(255) NOT NULL,
    `coSan` INT NOT NULL,
    `giaDoAn` FLOAT NOT NULL,
    `anh`  LONGTEXT,
    `hienThi` INT);
     

-- CHI TIẾT ĐỒ ĂN
CREATE TABLE IF NOT EXISTS`ChiTietDoAn`(
    `idCTDA`  INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    `soLuong` INT NOT NULL,
    `idDoAn` INT NOT NULL,
    `idVe`  VARCHAR(255),
    FOREIGN KEY (`idDoAn`) REFERENCES DoAn(`idDoAn`),
    FOREIGN KEY (`idVe`) REFERENCES Ve(`idVe`) 
);    
-- 
CREATE TABLE IF NOT EXISTS`baner`(
    `idBaner`  INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    `anh` Longtext not null,
    `hienThi` INT NOT NULL
);    

-- SELECT TỔNG SỐ ĐỒ ĂN ĐANG CÓ
SELECT COUNT(idDoAn) AS SoLuongIdDoAnHienThi
FROM DoAn
WHERE hienThi = 1;
-- tổng số đồ lượng đồ ăn có sẵn( tồn kho)
SELECT SUM(coSan) AS TongCoSan
FROM DoAn
WHERE hienThi = 1;
-- Tên đồ ăn kèm số lượng
SELECT tenDoAn, SUM(coSan) AS TongSoLuong
FROM DoAn 
WHERE hienThi = 1
GROUP BY tenDoAn;
-- Tổng vé đã bán từ trước đến giờ
SELECT COUNT(idVe) AS tongSo FROM ve
-- Tổng vé đã bán hôm nay
SELECT COUNT(idVe) AS tongSo FROM ve WHERE ngayMua=CURRENT_DATE 
-- Số vé bán trong 7 ngày qua 
-- Tạo bảng chứa tất cả các ngày trong 7 ngày qua
CREATE TEMPORARY TABLE AllDays (
    Ngay DATE
);

INSERT INTO AllDays (Ngay)
VALUES
    (CURDATE() - INTERVAL 6 DAY),
    (CURDATE() - INTERVAL 5 DAY),
    (CURDATE() - INTERVAL 4 DAY),
    (CURDATE() - INTERVAL 3 DAY),
    (CURDATE() - INTERVAL 2 DAY),
    (CURDATE() - INTERVAL 1 DAY),
    (CURDATE());

SELECT AllDays.Ngay, COUNT(Ve.ngayMua) AS TongSoVe
FROM AllDays
LEFT JOIN Ve ON AllDays.Ngay = DATE(Ve.ngayMua)
WHERE AllDays.Ngay BETWEEN CURDATE() - INTERVAL 6 DAY AND CURDATE()
GROUP BY AllDays.Ngay;


-- Tổng phim đang chiếu
SELECT COUNT(idLichChieu) AS tongSoLichChieu FROM lichchieu WHERE hienThi=1
-- vé mua online
SELECT COUNT(*) as veOnline
FROM Ve
WHERE email IS NOT NULL;
--vé mua tại quầy
SELECT COUNT(*) as veTaiQuay FROM Ve WHERE idNhanVien IS NOT NULL;

-- doanh thu theo năm
SELECT
    DATE_FORMAT(all_months.Thang, '%Y-%m') AS Thang,
    COALESCE(SUM(Ve.tongTien), 0) AS TongDoanhThu
FROM
    (
        SELECT '2023-01-01' + INTERVAL n MONTH AS Thang
        FROM (
            SELECT 0 AS n UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION SELECT 11
        ) AS n
    ) all_months
LEFT JOIN
    Ve ON DATE_FORMAT(all_months.Thang, '%Y-%m') = DATE_FORMAT(Ve.ngayMua, '%Y-%m')
GROUP BY
    DATE_FORMAT(all_months.Thang, '%Y-%m');

