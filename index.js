const express = require('express');
const app = express();
const ytdl = require('ytdl-core');
const fs = require('fs');

app.get('/download', async (req, res) => {
  const videoUrl = req.query.url; // Get the video URL from the query parameter
  if (!videoUrl) {
    res.status(400).send('Please provide a valid video URL');
    return;
  }

  try {
    const info = await ytdl.getInfo(videoUrl);
    const videoStream = ytdl(videoUrl, {
      quality: 'lowest',
    });

    res.header('Content-Disposition', `attachment; filename="${info.videoDetails.title}.mp4"`);

    // Set the content length header to the size of the video
    res.header('Content-Length', info.videoDetails.lengthSeconds);

    videoStream.pipe(res);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
