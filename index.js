const express = require('express');
const app = express();
const port = 3000;

app.get('/play', (req, res) => {
  const videoURL = req.query.url;

  if (!videoURL) {
    return res.status(400).send('Missing YouTube video URL');
  }

  // Replace this part with your code to play the Opus audio from the provided YouTube URL
  console.log(`Playing Opus audio from URL: ${videoURL}`);
  // Your code to play Opus audio goes here

  res.send('Playing Opus audio...');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

