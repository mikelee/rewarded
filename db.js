const postgres = require('postgres');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const sql = postgres(process.env.PG_URL);

module.exports = sql;