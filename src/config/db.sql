
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
    `tenTheLoai` varchar(255) NOT NULL
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
    `idVe` int auto_increment primary key not null ,
    `soVe` int not null,
    `ngayMua` DATE not null,
    `tongTien` FLOAT not null,
    `ngayThanhToan` DATE NOT NULL,
    `trangThai` INT NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `idNhanVien` varchar(255) not null,
    `idLichChieu` INT NOT NULL,
    FOREIGN KEY (`email`) REFERENCES NguoiDung(`email`),
    FOREIGN KEY (`idNhanVien`) references NhanVien(`idNhanVien`),
    FOREIGN KEY (`idLichChieu`) references LichChieu(`idLichChieu`)

);

CREATE TABLE IF NOT EXISTS`ViTriGhe`(
    `idViTriGhe`  INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    `tenGhe` varchar(255) NOT NULL,
    `trangThai` INT NOT NULL,
    `idPhongChieu` INT NOT NULL,
    `idVe`  int not null,
    FOREIGN KEY (`idPhongChieu`) REFERENCES `PhongChieu`(`idPhongChieu`),
    FOREIGN KEY (`idVe`) REFERENCES Ve(`idVe`) 
);
 
CREATE TABLE IF NOT EXISTS`ThongBao`(
    `idTB` int auto_increment primary key not null,
    `noiDung` VARCHAR(255) not null,
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