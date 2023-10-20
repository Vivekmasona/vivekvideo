const express = require('express');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const app = express();

app.get('/download', (req, res) => {
  const videoUrl = req.query.url; // The YouTube video URL

  if (!ytdl.validateURL(videoUrl)) {
    return res.status(400).send('Invalid YouTube URL');
  }

  const audio = ytdl(videoUrl, { quality: 'highestaudio' });

  res.header('Content-Disposition', 'attachment; filename="audio.mp3"');
  res.header('Content-Type', 'audio/mpeg');

  audio.pipe(res);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

