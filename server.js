require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/api/getPlacesOfInterest', async (req, res) => {
    const { destination, duration, people } = req.body;

    const prompt = `Tell me how many places of interest ${people} people going to ${destination} for ${duration} days can visit. Then, show me in a numbered table the recommended number of places +5 more options. Table should include details for the various places such as category (e.g. adventure, scenic, cultural, etc.), cost, average time to spend there (hours) and google ratings).`;

    try {
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: 'text-gpt-3.5-turbo',
            prompt: prompt,
            max_tokens: 500
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            }
        });

        res.json({ text: response.data.choices[0].text });
    } catch (error) {
        console.error('Error fetching data from OpenAI:', error.response ? error.response.data : error.message);
        res.status(500).json({
            error: 'Something went wrong!',
            details: error.response ? error.response.data : error.message
        });
    }
});

app.get('/', (req, res) => {
    res.send('Welcome to TourGether!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
