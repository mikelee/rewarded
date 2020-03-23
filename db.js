const mysql = require('mysql');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const url = process.env.CLEARDB_DATABASE_URL + '&multipleStatements=true';
const connection = mysql.createPool(url);

module.exports = connection;