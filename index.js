const express = require('express');
const app = express();
const ytdl = require('ytdl-core');
const fs = require('fs');

app.get('/download', async (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) {
    res.status(400).send('Please provide a valid video URL');
    return;
  }

  try {
    const info = await ytdl.getInfo(videoUrl);
    const videoStream = ytdl(videoUrl, {
      quality: 'highestaudio',
      filter: 'audioonly', // This will filter for audio-only streams
      format: 'mp3', // Specify the format as MP3
    });

    res.header('Content-Disposition', `attachment; filename="${info.videoDetails.title}.mp3"`);
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

