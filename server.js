// server.js (Node.js with Express.js)

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path'); // Import the 'path' module
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Add this line to parse JSON data
app.use(express.static(path.join(__dirname)));

// Serve aquestionforlily.html from the current directory
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'aquestionforlily.html'));
});

// Handle Lily's response
app.post('/response', (req, res) => {
    const response = req.body.response;
    
    // Log Lily's response to a file
    fs.appendFile('lily_response.log', response + '\n', (err) => {
        if (err) throw err;
        console.log('Lily\'s response logged: ' + response);
    });
    
    res.send('Your response has been recorded. Thank you!');
});

// Start server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
