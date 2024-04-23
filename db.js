const postgres = require('postgres');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

let url;

if (process.env.NODE_ENV !== 'production') {
    url = process.env.PG_URL_TEST;
} else {
    url = process.env.PG_URL_PROD;
}

const sql = postgres(url, {
    ssl: true
});

module.exports = sql;