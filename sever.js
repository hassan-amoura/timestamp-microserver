const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Define route handler for /api/:date
app.get('/api/:date', (req, res) => {
    let { date } = req.params;

    // Check if date is empty
    if (!date) {
        const currentUnixTime = Date.now();
        const currentUtcTime = new Date().toUTCString();

        res.json({
            unix: currentUnixTime,
            utc: currentUtcTime
        });
        return;
    }

    const timestamp = Date.parse(date);

    if (!isNaN(timestamp)) {
        const formattedUtcDate = new Date(date).toUTCString();
        res.json({
            unix: timestamp,
            utc: formattedUtcDate
        });
    } else {
        res.status(400).json({ error: 'Invalid Date' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});