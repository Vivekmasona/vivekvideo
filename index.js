const express = require('express');
const app = express();

// URL parameter "url" se YouTube link prapt karein
app.get('/thumbnail', (req, res) => {
  const youtubeLink = req.query.url;

  // YouTube link se video ID nikale
  const videoId = extractVideoId(youtubeLink);

  if (videoId) {
    // Thumbnail URL banaye
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    // Thumbnail URL ko client ko bheje
    res.send(`<img src="${thumbnailUrl}" alt="YouTube Thumbnail">`);
  } else {
    res.send('Invalid YouTube link.');
  }
});

// Server ko port 3000 par sunaye
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// YouTube link se video ID nikalne ka function
function extractVideoId(url) {
  // YouTube video ID ko extract karne ke liye regular expression ka upayog karein
  const regex = /(?:\/|%3D|v=|vi=|youtu\.be\/|\/embed\/|\/v\/|\/e\/|watch\?v=|youtube.com\/user\/[^#]*#([^\/]*?\/)*)[^#\&\?]*?([^\<\>\"\'\s]*)/;
  const match = url.match(regex);

  if (match && match[2].length === 11) {
    return match[2]; // Extracted video ID
  } else {
    return null; // Invalid YouTube link
  }
      }
