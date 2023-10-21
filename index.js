const express = require('express');
const ytdl = require('ytdl-core');
const app = express();
const port = 3000;

// Define a route to get the direct low-quality audio stream URL from a YouTube URL
app.get('/audio', async (req, res) => {
  const ytUrl = req.query.url;

  if (!ytUrl) {
    res.status(400).send('YouTube video URL parameter is missing.');
    return;
  }

  try {
    const info = await ytdl.getInfo(ytUrl);
    
    // Choose the lowest quality audio format
    const audioInfo = ytdl.chooseFormat(info.formats, { quality: 'lowestaudio' });

    if (!audioInfo) {
      res.status(404).send('No low-quality audio stream found for this video.');
      return;
    }

    const audioUrl = audioInfo.url;

    // Redirect to the direct low-quality audio stream URL
    res.redirect(audioUrl);
  } catch (error) {
    res.status(500).send('Error fetching low-quality audio stream URL.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

