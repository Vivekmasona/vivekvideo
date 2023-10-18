const express = require('express');
const ytdl = require('ytdl-core');
const app = express();
const port = 3000;

app.get('/get-direct-audio-link', (req, res) => {
  const videoUrl = req.query.url; // Get the YouTube video URL from the query parameter

  if (!videoUrl) {
    return res.status(400).send('Video URL is missing');
  }

  ytdl.getInfo(videoUrl, (err, info) => {
    if (err) {
      console.error('Error getting video info:', err);
      return res.status(500).send('Error getting video info');
    } else {
      const format = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
      
      if (format) {
        res.send({ directPlaybackLink: format.url });
      } else {
        res.status(404).send('No audio format found');
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

