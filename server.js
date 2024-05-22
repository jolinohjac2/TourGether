const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exceljs = require('exceljs');

const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// Define the /recommendations endpoint
app.post('/recommendations', async (req, res) => {
    const { destination, duration, groupSize } = req.body;

    // Your code for processing recommendations
    try {
        // Read data from the Excel file and process recommendations
        const workbook = new exceljs.Workbook();
        await workbook.xlsx.readFile('TravelDB.xlsx');

        // Process recommendations...

        // Redirect to result.html with query parameters
        res.redirect(`/result.html?destination=${destination}&duration=${duration}&groupSize=${groupSize}`);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
