const express = require('express');
const app = express();
const port = 3000;

// Define a route to get a videoplayback URL as a query parameter
app.get('/video', (req, res) => {
  const videoplaybackUrl = req.query.videoplaybackUrl;
  
  if (!videoplaybackUrl) {
    res.status(400).send('Videoplayback URL parameter is missing.');
    return;
  }
  
  // Now you can use the videoplaybackUrl in your code
  res.send(`Videoplayback URL: ${videoplaybackUrl}`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

