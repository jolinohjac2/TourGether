const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exceljs = require('exceljs');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define the /recommendations endpoint
app.post('/recommendations', async (req, res) => {
    const { destination, duration, groupSize } = req.body;

    // Read data from the Excel file and process recommendations
    try {
        const workbook = new exceljs.Workbook();
        await workbook.xlsx.readFile('TravelDB.xlsx');

        const generalSheet = workbook.getWorksheet('General');
        const destinationSheet = workbook.getWorksheet(destination);

        let generalRow;
        generalSheet.eachRow((row, rowNumber) => {
            if (row.getCell('Duration').value === duration) {
                generalRow = row;
            }
        });

        if (!generalRow) {
            return res.status(404).json({ message: 'No data found for the specified duration.' });
        }

        const numberOfPlaces = generalRow.getCell('Number of places to visit').value;
        const numberOfOptions = generalRow.getCell('Number of options to display').value;

        const suggestions = [];
        destinationSheet.eachRow((row, rowNumber) => {
            if (rowNumber > 1 && suggestions.length < numberOfOptions) {
                suggestions.push({
                    sn: row.getCell('S/N').value,
                    shortDescription: row.getCell('Short Description').value,
                    category: row.getCell('Category').value,
                    avgTimeSpent: row.getCell('Avg. Time Spent').value,
                    googleRatings: row.getCell('Google Ratings').value,
                });
            }
        });

        const message = `For a ${duration}-day visit to ${destination}, we suggest that you visit ${numberOfPlaces} places.`;

        res.json({ message, suggestions });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// Catch-all route to serve index.html for any other requests
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
