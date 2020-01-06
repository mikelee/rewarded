const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();

// import mysql from './config';
const config = require('./config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(cors());

const connection = mysql.createConnection(config);
connection.connect(err => {
    if (err) {
        console.log(err)
    };
});


// API Routes

// Get all to-dos
app.get('/api', function(req, res) {
    connection.query("SELECT * FROM to_dos WHERE owner_id = '1'", (err, results) => {
        if (!err) {
            res.json(results);
        } else {
            console.log(err);
        }
    });
});

// Update to-do
app.put('/api/todo/:id', function(req, res) {
    connection.query(`UPDATE to_dos SET text = '${req.body.text}' WHERE to_do_id = '${req.params.id}'`, () => {
        res.redirect('/');
    });
});

// Delete to-do
app.delete('/api/todo/:id', function(req, res) {
    connection.query(`DELETE FROM to_dos WHERE to_do_id = '${req.params.id}'`, () => {
        res.redirect('/');
    });
});

app.listen(process.env.PORT || 4444, () => {
    console.log('Server started');
});