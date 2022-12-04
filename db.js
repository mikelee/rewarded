const postgres = require('postgres');

const sql = postgres(process.env.PG_URL, {
    ssl: true
});

module.exports = sql;