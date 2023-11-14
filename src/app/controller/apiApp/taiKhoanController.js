const connection = require("../../../config/connection");
const nodemailer = require("nodemailer");

const resetCode = Math.floor(100000 + Math.random() * 900000);

class nguoiDung {
  // POST[]/nguoidung/dangky
  async registerNguoiDung(req, res) {
    const { email, matKhau, hoTen, dienThoai, anh, ngaySinh, diaChi } =
      req.body;

    const checkQuerry = `SELECT COUNT(*) as count FROM NguoiDung WHERE email=?`;
    connection.query(checkQuerry, [email], (checkErr, checkResult) => {
      if (checkErr) {
        console.error("Lỗi", checkErr.message);
        return;
      }
      if (checkResult[0].count > 0) {
        res.status(404).json({ message: "Email đã người dùng đã tồn tại" });
      } else {
        const registQuerry = `INSERT INTO NguoiDung (email,hoTen,matKhau,dienThoai,anh,ngaySinh,diaChi,hienThi,trangThaiNguoiDung) 
                VALUES(?, ?, ?, ?, ? , ?, ?,  1, 1)`;
        const registValues = [
          email,
          hoTen,
          matKhau,
          dienThoai,
          anh,
          new Date(ngaySinh),
          diaChi,
          1,
        ];
        connection.query(registQuerry, registValues, (insertErr, result) => {
          if (insertErr) {
            console.error("Lỗi", err.message);
            res.status(405).json({ message: "Lỗi" });
            return;
          }
          res.status(201).json({ message: "Đăng ký thành công" });
        });
      }
    });
  }

  // POST[]/resetMatKhauRequest
  async resetMatKhauRequest(req, res) {
    const email = req.body.email;

    const checkQuerry = `SELECT * FROM NguoiDung WHERE email=? AND hienThi=1`;
    connection.query(checkQuerry, [email], (checkErr, checkResult) => {
      if (checkErr) {
        console.error("Lỗi", err.message);
        res.status(405).json({ message: "Lỗi" });
        return;
      }
      if (checkResult.length === 0) {
        res.status(404).json({ message: "Email không tồn tại" });
      } else {
        try {
          const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
              user: "lotiendat202@gmail.com",
              pass: "jqyjyavzvlqgkfhn",
            },
          });

          const mailOptions = {
            from: "lotiendat202@gmail.com",
            to: email,
            subject: "Mã xác nhận reset lại mật khẩu",
            text: `Mã xác nhận của bạn là: ${resetCode}`,
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
              res.status(500).json({ message: "Lỗi gửi mail" });
            } else {
              console.log("Mã: " + resetCode);
              res.status(200).json({ message: "Mã xác nhận đã được gửi đến" });
            }
          });
        } catch (err) {
          console.log(err);
          res.status(500).json({ message: "Lỗi" });
        }
      }
    });
  }

  // POST[]/comfirmResetMatKhau
  async comfirmResetMatKhau(req, res) {
    try {
      const { email, matKhau, resetCodeBody } = req.body;

      const resetQuerry = `UPDATE NguoiDung SET matKhau=? WHERE email=? AND hienThi=1`;
      connection.query(resetQuerry, [matKhau, email], (err, result) => {
        if (err) {
          console.error("Lỗi", checkErr.message);
          res.status(404).json({ message: "Lỗi" });
          return;
        }
        if (resetCodeBody != resetCode) {
          res.status(500).json({ message: "Mã xác nhận không trùng" });
          return;
        }
        res.json({ message: "Thay đổi mật khẩu thành công" });
      });
    } catch (err) {
      console.log("Lỗi", err.message);
      res.status(500).json({ message: "Lỗi" });
    }
  }

  // POST[]/nguoidung/dangnhap
  async loginNguoiDung(req, res) {
    const email = req.body.email;
    const matKhau = req.body.matKhau;

    const querry = `SELECT *  FROM NguoiDung WHERE email=? and hienThi=1 and trangThaiNguoiDung=1`;
    const values = [email];
    connection.query(querry, values, (err, results) => {
      if (err) {
        console.error("Lỗi", err.message);
        return;
      }
      if (results.length == 0) {
        res.status(404).json({ message: "Người dùng không tông tại" });
      } else {
        if (matKhau === results[0].matKhau) {
          res.status(202).json({ message: "Đăng nhập thành công" });
        } else {
          res.status(401).json({ message: "Mật khẩu không đúng" });
        }
      }
    });
  }
  // GET[]/nguoidung/thongtin/:email
  async getThongTinNguoiDungByEmail(req, res) {
    const email = req.params.email;
    const querry = `SELECT * FROM NguoiDung WHERE email=? and hienThi=1`;
    connection.query(querry, [email], (err, results) => {
      if (err) {
        console.error("Lỗi", err.message);
        return;
      }
      const NguoiDung = results[0];
      res.json(NguoiDung);
    });
  }
  // PUT[]/nguoidung/doithongtin/:email
  async updateThongTinNguoiDung(req, res) {
    const email = req.params.email;
    const { hoTen, dienThoai, anh, ngaySinh, diaChi } = req.body;

    const updateQuerry = `UPDATE NguoiDung SET hoTen= ?, dienThoai= ?, anh= ?, ngaySinh= ?, diaChi= ? 
        WHERE email=? `;
    const updateValues = [
      hoTen,
      dienThoai,
      anh,
      new Date(ngaySinh),
      diaChi,
      email,
    ];

    connection.query(updateQuerry, updateValues, (err, result) => {
      if (err) {
        console.error("Lỗi", err.message);
        res.status(404).json({ message: "Lỗi" });
        return;
      }
      res.json({ message: "Thay đổi thông tin thành công" });
    });
  }
  // PUT[]/nguoidung/doimatkhau/:email
  async changePasswordByEmail(req, res) {
    const email = req.params.email;
    const matKhau = req.body.matKhau;
    const updateQuerry = `UPDATE NguoiDung SET matKhau=? WHERE email=?`;
    connection.query(updateQuerry, [matKhau, email], (err, result) => {
      if (err) {
        console.error("Lỗi", err.message);
        res.status(404).json({ message: "Lỗi" });
        return;
      }
      res.json({ message: "Đổi mật  khẩu thành công" });
    });
  }
  // PUT[]/nguoidung/xoaTaiKhoan
  async deleteTaiKhoan(req, res) {
    const email = req.params.email;
    const updateQuerry = `UPDATE NguoiDung SET hienThi=0 WHERE email=?`;
    connection.query(updateQuerry, [email], (err, result) => {
      if (err) {
        console.error("Lỗi");
        res.status(404).json({ message: "Lỗi" });
        return;
      }
      res.json({ message: "Xóa tài khoản thành công" });
    });
  }
}
module.exports = new nguoiDung();
