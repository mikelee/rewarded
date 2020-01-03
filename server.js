const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// import mysql from './config';
const config = require('./config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

const connection = mysql.createConnection(config);
connection.connect(err => {
    if (err) {
        console.log(err)
    };
});



app.get('/api', function(req, res) {
    connection.query("SELECT * FROM to_dos WHERE owner_id = '1'", function(err, results) {
        if (!err) {
            res.json(results);
        } else {
            console.log(err);
        }
    });
});

app.listen(process.env.PORT || 4444, function() {
    console.log('Server started');
});