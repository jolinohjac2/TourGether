// Needed for Express
const express = require('express');
const app = express();

// Needed for public directory
app.use(express.static(__dirname + '/public'));

// Needed for parsing form data
app.use(express.json());      
app.use(express.urlencoded({ extended: true }));

const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const port = 3000;

// Endpoint to handle form submission
app.post('/query', (req, res) => {
    const { destination, duration } = req.body;
    const numPlaces = parseInt(duration) * 4; // Calculate number of places to fetch

    const results = [];

    // Debugging output to check if CSV parsing starts
    console.log('CSV parsing started');

// Read CSV file and parse data
    fs.createReadStream(`${destination}.csv`)
        .pipe(csv())
        .on('error', (error) => {
            console.error('Error reading CSV file:', error);
            res.status(500).send('Internal Server Error');
        })
        .on('data', (row) => {
            // Log each row of data read from the CSV file
            console.log('Row:', row);
            results.push(row);
        })
        .on('end', () => {
            // Log the total number of rows read from the CSV file
            console.log('CSV parsing completed. Total rows:', results.length);
            
            const filteredResults = results.slice(0, numPlaces);
            res.json(filteredResults);
        });
});

app.get('/result.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'result.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
