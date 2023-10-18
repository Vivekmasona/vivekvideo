const express = require('express');
const ytdl = require('ytdl-core');
const app = express();
const port = 3000; // Choose an appropriate port number

app.get('/play', (req, res) => {
  const youtubeUrl = req.query.url; // Get the YouTube URL from the query parameter

  if (!youtubeUrl) {
    return res.status(400).send('Missing YouTube URL');
  }

  const stream = ytdl(youtubeUrl, { filter: 'audioonly', quality: 'lowestaudio' });

  res.set('Content-Type', 'audio/mpeg');
  stream.pipe(res);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

