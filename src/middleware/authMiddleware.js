module.exports = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login'); 
  }

  if (req.session.user[0].vaiTro !== 'admin') {
    req.flash('notificationErr', 'Bạn không thể sử dụng chức năng này');
    return res.redirect('/tongquan');
  }
  next();
};