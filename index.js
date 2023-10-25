const express = require('express');
const ytdl = require('ytdl-core');
const app = express();
const port = 3000; // You can change this to the desired port

app.get('/mp4', async (req, res) => {
  const videoUrl = req.query.url;

  if (!videoUrl) {
    return res.status(400).send('Please provide a valid video URL.');
  }

  try {
    // Fetch video details using ytdl-core
    const info = await ytdl.getInfo(videoUrl);

    // Extract the video title
    const videoTitle = info.videoDetails.title;

    res.send(`Song Title: ${videoTitle}`);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred while fetching video details.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


