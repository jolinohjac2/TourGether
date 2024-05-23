// Needed for dotenv
require("dotenv").config();

// Needed for Express
var express = require('express')
var app = express()

// Setting where the location of your EJS files are
app.set('views', '.')

// Needed for EJS
app.set('view engine', 'ejs');

// Needed for public directory
app.use(express.static(__dirname + '/public'));

// Needed for parsing form data
app.use(express.json());      
app.use(express.urlencoded({extended: true}));

// root page
app.get('/public', function(req, res) {
   res.render('index');
});

const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const port = 3000;

app.use(express.json());

// Endpoint to handle form submission
app.post('/query', (req, res) => {
    const { input } = req.body;

    // Read your CSV file and filter data based on input
    const results = [];
    fs.createReadStream('your_csv_file.csv')
        .pipe(csv())
        .on('data', (row) => {
            // Example: Assuming 'column_name' is a column in your CSV data
            if (row.column_name === input) {
                results.push(row);
            }
        })
        .on('end', () => {
            res.json(results);
        });
});


app.get('/result.html', (req, res) => {
   res.sendFile(path.join(__dirname, 'public', 'result.html'));
});

app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
});

// Tells the app which port to run on
app.listen(8080);