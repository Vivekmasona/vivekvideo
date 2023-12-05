const express = require('express');
const youtubedl = require('youtubedl-core');
const fs = require('fs');

const app = express();
const port = 3000;

app.get('/videodl', (req, res) => {
  const videoUrl = req.query.url;

  if (!videoUrl) {
    return res.status(400).send('Video URL is missing.');
  }

  const options = {
    format: 'best',
  };

  const video = youtubedl(videoUrl, options);

  res.setHeader('Content-Disposition', 'attachment; filename=output.mp4');
  video.pipe(res);

  video.on('end', () => {
    console.log('Download complete!');
  });

  video.on('error', (error) => {
    console.error(`Error: ${error.message}`);
    res.status(500).send('Internal Server Error');
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

