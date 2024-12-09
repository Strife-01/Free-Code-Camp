const express = require('express');
const cors = require('cors');
const app = express();

// Enable all CORS requests
app.use(cors());

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Example route for testing
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html'); // Ensure your HTML file is in the 'public' folder
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
