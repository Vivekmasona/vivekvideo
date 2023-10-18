const express = require('express');
const ytdl = require('ytdl-core');
const app = express();
const port = 3000;

app.get('/play', async (req, res) => {
  const youtubeUrl = req.query.url;
  const timestamp = req.query.t || 0; // Default to 0 if no timestamp is provided

  if (!youtubeUrl) {
    res.status(400).send('Missing YouTube URL');
  } else {
    try {
      const stream = ytdl(youtubeUrl, { filter: 'audioonly', quality: 'lowestaudio', begin: timestamp });
      res.set('Content-Type', 'audio/mpeg');
      stream.pipe(res);
    } catch (error) {
      console.error(error);
      res.status(500).send('Failed to retrieve audio from YouTube URL');
    }
  }
});

app.use(express.static('public')); // Serve the HTML file

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

