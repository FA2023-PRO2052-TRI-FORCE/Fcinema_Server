const multer = require("multer");
const upload = multer({ dest: "src/images/" });

const connection = require("../../config/connection");

class quanlythongtin {
  async goToManager(req, res) {
    const querry = `SELECT * FROM NhanVien WHERE vaiTro= 'admin'`; //hienThi=1
    connection.query(querry, (err, result) => {
      if (err) {
        console.error("Lỗi", err.message);
        return;
      }

      console.log("========");
      console.log("", result);
      const Admin = result;
      res.render("account/managerAdmin", { Admin, title: "Admin" });
    });
  }
  async updateProfile(req, res) {
    // const { hoTen, dienThoai, ngaySinh, diaChi, gioiTinh } = req.body;
    // const idNhanVien = req.body.idNhanVien;
    // khong cos update leen database duoc
    // ủa phần quản lý thông tin này là cả admin vs nhân viên đều thực hiện được mà sao lại để vaiTro=admin vs idNV=admin
    // /còn nữa, cập lại thông tin thì trường idNhanVien không được cập nhật lại, vaiTro cũng thế
    // thees là cái update này là cả admin với nhân viên à tưởng admin thôi còn nhân viên là được admin quản lý :v 
    // ........ bữa nói r k chịu nghe 
    // mà từ tại không rõ ấy tại admin mới đăng nhập được hay là cả nhanvien cũng đăng nhập được lun hả 
    // @@@ cả nhân viên vs admin đều đăng nhập đc chứ, bữa phần sửa lại cái usercase cũng có nói r đó, ở phần admin quản lý nhân viên nếu làm thêm nhân viên rồi thì k cần làm sửa nhân viên vì nhân viên cho nó tự quản lý cũng đc nhưng nếu giờ ô làm sửa luôn thì cũng đc 
    // nhưng phần quản lý thông tin này thì cả nhân viên vs admin đều làm đc nha
    // oke 
    const idNhanVien = 'Admin'
    const hoTen = req.body.hoTen;
    const dienThoai = req.body.dienThoai;
    const ngaySinh = req.body.ngaySinh;
    const diaChi = req.body.diaChi;
    const gioiTinh = req.body.gioiTinh;
    const vaiTro = 'admin';
    let notificationSuccess;

    let query;
    let params;

    if (req.file) {
      const anh = req.file.path;
      query = `
        UPDATE NhanVien SET hoTen = ?, dienThoai = ?, anh = ?, ngaySinh = ?, diaChi = ?, gioiTinh = ? WHERE idNhanVien = ? AND vaiTro = ?`;
      params = [hoTen , dienThoai, ngaySinh, diaChi, gioiTinh, anh, idNhanVien, vaiTro];
    } else {
      query = `
        UPDATE NhanVien SET hoTen = ?, dienThoai = ?, ngaySinh = ?, diaChi = ?, gioiTinh = ? WHERE idNhanVien = ? AND vaiTro = ? `;
      params = [hoTen, dienThoai, ngaySinh, diaChi, gioiTinh, idNhanVien, vaiTro];
    }

    connection.query(query, params, (err, result) => {
      if (err) {
        console.error("Lỗi", err.message);
        let notificationErr = 'Cập nhật thất bại!';
        res.render("account/managerAdmin", {
          notificationErr: notificationErr,
          title: "Admin",
        });
        return;
      }
      notificationSuccess = 'Cập nhật thành công!';
      console.log(result)
      console.log(req.body)
      res.render("account/managerAdmin", {
        notificationSuccess: notificationSuccess,
        title: "Admin",
      });
    // req.flash('notificationSuccess', 'Cập nhật lịch chiếu thành công');
    // res.redirect('/managerAdmin');
    });

  }

  async goToChangePass(req, res) {
    res.render("account/changePassAdmin", { title: "Thay đổi mật khẩu" });
  }
}

module.exports = new quanlythongtin();
