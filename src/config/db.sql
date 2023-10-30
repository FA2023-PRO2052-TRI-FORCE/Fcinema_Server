
-- DÁN ĐOẠN CODE NÀY LÊN MYSQL XAMPP: ĐẦU TIÊN LÀ DÁN ĐOẠN MÃ TẠO DATABASE TRƯỚC XONG RỒI VÔ DATABASE ĐÓ DÁN MẤY CÂU LỆNH TẠO BẢNG VS DỮ LIỆU MẪU, DỮ LIỆU MẪU TỰ NGHĨ NHA

CREATE DATABASE `f_cinema`;



CREATE TABLE IF NOT EXISTS `NguoiDung`(
    `email` varchar(255) PRIMARY KEY NOT NULL,
    `hoTen` varchar(255) DEFAULT NULL,
    `matKhau` varchar(255) NOT NULL,
    `dienThoai` varchar(255) DEFAULT NULL,
    `anh` LONGBLOB DEFAULT NULL,
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
    `anh` LONGBLOB DEFAULT NULL,
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
    `anh` LONGBLOB NOT NULL,
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
SELECT v.idVe, p.tenPhim, l.ngayChieu,l.caChieu,t.tenPhongChieu,v.soVe,v.ngayMua,v.tongTien,v.trangThai,f.tenGhe FROM ve v, lichchieu l,phim p, phongchieu t, vitrighe f
WHERE p.idPhim=l.idPhim AND l.idPhongChieu=t.idPhongChieu AND v.idLichChieu=l.idLichChieu AND v.idVe=f.idVe;
-- 
SELECT
    *
FROM (
  SELECT
    v.idVe,
    p.tenPhim,
    l.ngayChieu,
    l.caChieu,
    t.tenPhongChieu,
    v.soVe,
    v.ngayMua,
    v.tongTien,
    v.trangThai
  FROM ve v
  JOIN lichchieu l ON v.idLichChieu = l.idLichChieu
  JOIN phim p ON l.idPhim = p.idPhim
  JOIN phongchieu t ON l.idPhongChieu = t.idPhongChieu
) AS ticket_info
JOIN vitrighe f ON ticket_info.idVe = f.idVe;
-- 
SELECT
  v.idVe AS ticket_id,
  p.tenPhim AS movie_title,
  l.ngayChieu AS screening_date,
  l.caChieu AS showtime,
  t.tenPhongChieu AS cinema_hall_name,
  v.soVe AS number_of_tickets,
  v.ngayMua AS purchase_date,
  v.tongTien AS total_price,
  v.trangThai AS ticket_status,
  f.tenGhe AS seat_name
FROM ve v
INNER JOIN lichchieu l ON v.idLichChieu = l.idLichChieu
INNER JOIN phim p ON l.idPhim = p.idPhim
INNER JOIN phongchieu t ON l.idPhongChieu = t.idPhongChieu
INNER JOIN vitrighe f ON v.idVe = f.idVe
ORDER BY v.idVe;
-- 
SELECT
  v.idVe AS ticket_id,
  p.tenPhim AS movie_title,
  l.ngayChieu AS screening_date,
  l.caChieu AS showtime,
  t.tenPhongChieu AS cinema_hall_name,
  v.soVe AS number_of_tickets,
  v.ngayMua AS purchase_date,
  v.tongTien AS total_price,
  v.trangThai AS ticket_status,
  CONCAT(f.tenGhe, ' (', f.idVe, ', ', f.idPhongChieu, ')') AS seat_info
FROM ve v
INNER JOIN lichchieu l ON v.idLichChieu = l.idLichChieu
INNER JOIN phim p ON l.idPhim = p.idPhim
INNER JOIN phongchieu t ON l.idPhongChieu = t.idPhongChieu
INNER JOIN vitrighe f ON v.idVe = f.idVe
ORDER BY v.idVe;
