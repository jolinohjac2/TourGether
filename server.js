// server.js
const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// POST endpoint to handle form submission
app.post('/submit-form', (req, res) => {
    // Assuming your form sends data like { destination: 'Singapore', duration: 1, people: 4 }
    const { destination, duration } = req.body;

    // Read the CSV file
    const results = [];
    fs.createReadStream('Singapore.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            // Calculate the range of rows to be sent based on duration
            const startIndex = (duration - 1) * 4;
            const endIndex = startIndex + 4;
            const selectedRows = results.slice(startIndex, endIndex);

            // Send the selected rows as a response
            res.json(selectedRows);
        });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
