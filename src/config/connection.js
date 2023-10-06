// const mysql = require('mysql');
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',   
  user: 'root',        
  database: 'f_cinema', 
  port:3306
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Lỗi : ' + err.stack);
    return;
  }
  console.log('Kết nối thành công với mySQL');
});

module.exports = connection;