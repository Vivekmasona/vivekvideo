const express = require('express');
const ytdl = require('ytdl-core');
const app = express();
const port = 3000;

// Define a route to get the videoplayback URL from a YouTube URL
app.get('/video', async (req, res) => {
  const ytUrl = req.query.url;

  if (!ytUrl) {
    res.status(400).send('YouTube video URL parameter is missing.');
    return;
  }

  try {
    const info = await ytdl.getInfo(ytUrl);
    const videoInfo = ytdl.chooseFormat(info.formats, { quality: 'highest' });
    const videoplaybackUrl = videoInfo.url;

    res.send(`Videoplayback URL: ${videoplaybackUrl}`);
  } catch (error) {
    res.status(500).send('Error fetching videoplayback URL.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

