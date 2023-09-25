

const express = require('express');
const app = express();

app.get('/img', (req, res) => {
  const videoURL = req.query.url; // Get the video URL from the query parameters
  if (!videoURL) {
    res.status(400).send('Missing video URL');
    return;
  }

  const videoId = videoURL.split("v=")[1];
  if (!videoId) {
    res.status(400).send('Invalid video URL');
    return;
  }

  const imageURL = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  res.json({ imageURL });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
