const connection = require("../../../config/connection");
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
const bcrypt = require('bcrypt');
const emailPassword = path.join(__dirname, "../../../public/html/resetPasswordEmail.html");
const emailAuth = path.join(__dirname, "../../../public/html/authenciationEmail.html");

let originalCode;
class nguoiDung {
  //POST[]/authenciationEmail
  async requestAthenciationEmail(req, res) {
    const email = req.body.email;
    const checkEmailQuery = `SELECT COUNT(*) as count FROM NguoiDung WHERE email=?`;
    console.log('Recipient email:', email);
    const resetCode = Math.floor(100000 + Math.random() * 900000);
    originalCode = resetCode;

    connection.query(checkEmailQuery, [email], (err, results) => {
      if (err) {
        console.error("Lỗi", err.message);
        res.status(500).json({ message: "Lỗi " });
        return;
      }

      if (results[0].count > 0) {
        res.status(409).json({ message: "Email đã được đăng ký" });
        return;
      }

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
          subject: "Mã xác nhận xác thực email",
          html: fs.readFileSync(emailAuth, "utf8"),
        };

        mailOptions.html = mailOptions.html.replace(
          '<span id="resetCodeValue"></span>',
          resetCode
        );
        mailOptions.html = mailOptions.html.replace(
          '<span id="emailRequest"></span>',
          email
        );

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error(error);
            res.status(500).json({ message: "Lỗi gửi mail", error, email });
          } else {
            console.log("Mã: " + resetCode);
            res.status(200).json({ message: "Mã xác thực đã được gửi đến" });
          }
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Lỗi" });
      }
    });
  }


  // POST[]/nguoidung/dangky
  async registerNguoiDung(req, res) {
    try {
      const { resetCodeBody, nguoiDung } = req.body;
      console.log("Request Body:", req.body);
      console.log("Request ORIGINAL:", originalCode);

      const { email, matKhau, hoTen, dienThoai, anh, ngaySinh, diaChi } = nguoiDung;
      const hashedMatKhau = await bcrypt.hash(matKhau, 10);

      const otpCode = resetCodeBody;
      console.log("Request CODE:", otpCode);

      const registQuerry = `INSERT INTO NguoiDung 
        (email,hoTen,matKhau,dienThoai,anh,ngaySinh,diaChi,hienThi,trangThaiNguoiDung) 
        VALUES(?, ?, ?, ?, ? , ?, ?,  1, 1)`;

      const registValues = [
        email,
        hoTen,
        hashedMatKhau,
        dienThoai,
        anh,
        new Date(ngaySinh),
        diaChi,
        1,
      ];

      connection.beginTransaction(async (err) => {
        if (err) {
          console.error("Lỗi", err.message);
          res.status(500).json({ message: "Lỗi" });
          return;
        }

        try {
          connection.query(registQuerry, registValues);

          if (otpCode !== originalCode) {
            res.status(404).json({ message: "Mã xác nhận không trùng" });
            connection.rollback();
          } else {
            connection.commit();
            res.json({ message: "Đăng ký thành công" });
          }
        } catch (error) {
          connection.rollback();
          console.error("Lỗi", error.message);
          res.status(500).json({ error: "Lỗi" });
        }
      });
    } catch (error) {
      console.log("Lỗi", error.message);
      res.status(500).json({ error: "Lỗi" });
    }
  }


  // POST[]/resetMatKhauRequest
  async resetMatKhauRequest(req, res) {
    const email = req.body.email;
    const resetCode = Math.floor(100000 + Math.random() * 900000);
    originalCode = resetCode;
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
            html: fs.readFileSync(emailPassword, "utf8")
          };
          mailOptions.html = mailOptions.html.replace('<span id="resetCodeValue"></span>', resetCode);
          mailOptions.html = mailOptions.html.replace('<span id="emailRequest"></span>', email);

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

      const hashedMatKhau = await bcrypt.hash(matKhau, 10);

      const resetQuerry = `UPDATE NguoiDung SET matKhau=? WHERE email=? AND hienThi=1`;
      connection.query(resetQuerry, [hashedMatKhau, email], (err, result) => {
        if (err) {
          console.error("Lỗi", err.message);
          res.status(404).json({ message: "Lỗi" });
          return;
        }

        if (resetCodeBody !== originalCode) {
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

    const querry = `SELECT * FROM NguoiDung WHERE email=? AND hienThi=1 AND trangThaiNguoiDung=1`;
    const values = [email];

    connection.query(querry, values, async (err, results) => {
      if (err) {
        console.error("Lỗi", err.message);
        res.status(500).json({ message: "Lỗi" });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ message: "Người dùng không tồn tại" });
      } else {
        const hashedMatKhau = results[0].matKhau;
        try {
          const isPasswordMatch = await bcrypt.compare(matKhau, hashedMatKhau);

          if (isPasswordMatch) {
            res.status(202).json({ message: "Đăng nhập thành công" });
          } else {
            res.status(401).json({ message: "Mật khẩu không đúng" });
          }
        } catch (error) {
          console.error("Lỗi", error.message);
          res.status(500).json({ message: "Lỗi" });
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
    const currentMatKhau = req.body.matKhauCu;
    const newMatKhau = req.body.matKhau;

    const query = 'SELECT * FROM NguoiDung WHERE email = ?';
    connection.query(query, [email], async (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Lỗi' });
        }
        const user = results[0];

        const isPasswordValid = await bcrypt.compare(currentMatKhau, user.matKhau);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Mật khẩu cũ không đúng' });
        }

        const hashedNewPassword = await bcrypt.hash(newMatKhau, 10);
        const updatePasswordQuery = 'UPDATE NguoiDung SET matKhau = ? WHERE email = ?';

        connection.query(updatePasswordQuery, [hashedNewPassword, email], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Lỗi ' });
            }

            return res.status(200).json({ message: 'Đổi mật khẩu thành công' });
        });
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
  async regisByGoogle(req, res) {
    const { email, anh, hoTen } = req.body;
    const checkQuerry = `SELECT COUNT(*) as count FROM NguoiDung WHERE email=?`;
    connection.query(checkQuerry, [email], (checkErr, checkResult) => {
      if (checkErr) {
        console.error("Lỗi", checkErr.message);
        return;
      }
      if (checkResult[0].count > 0) {
        res.status(200).json({ message: "thành công" });
      } else {
        const registQuerry = `INSERT INTO NguoiDung (email,hoTen,anh,hienThi,trangThaiNguoiDung) 
                VALUES(?, ?, ?, 1, 1)`;
        const registValues = [email, hoTen, anh];
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
}
module.exports = new nguoiDung();
