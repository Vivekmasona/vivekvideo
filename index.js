const express = require('express');
const app = express();

// URL parameter "url" se YouTube link prapt karein
app.get('/thumbnail', (req, res) => {
  const youtubeLink = req.query.url;

  // YouTube link se video ID nikale
  const videoId = extractVideoId(youtubeLink);

  // Thumbnail URL banaye
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  // Thumbnail URL ko client ko bheje
  res.send(`<img src="${thumbnailUrl}" alt="YouTube Thumbnail">`);
});

// Server ko port 3000 par sunaye
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// YouTube link se video ID nikalne ka function
function extractVideoId(url) {
  // YouTube link se video ID nikalne ka logic yahan likhein
  // Example: "https://www.youtube.com/watch?v=VIDEO_ID" se "VIDEO_ID" nikalna
}

