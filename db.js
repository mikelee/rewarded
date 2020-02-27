const mysql = require('mysql');
const config = require('./config');

const connection = mysql.createConnection(config);
connection.connect(err => {
    if (err) {
        console.log(err)
    };
});

module.exports = connection;