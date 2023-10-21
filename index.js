const express = require('express');
const ytdl = require('ytdl-core');
const app = express();
const port = 3000;

// Define a route to get the direct audio stream URL from a YouTube URL
app.get('/audio', async (req, res) => {
  const ytUrl = req.query.url;

  if (!ytUrl) {
    res.status(400).send('YouTube video URL parameter is missing.');
    return;
  }

  try {
    const info = await ytdl.getInfo(ytUrl);

    // Filter formats to get only audio streams (excluding video)
    const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');

    if (audioFormats.length === 0) {
      res.status(404).send('No audio stream found for this video.');
      return;
    }

    const audioUrl = audioFormats[0].url; // Select the first audio format

    // Redirect to the direct audio stream URL
    res.redirect(audioUrl);
  } catch (error) {
    res.status(500).send('Error fetching audio stream URL.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

