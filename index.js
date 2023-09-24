const express = require('express');
const ytdl = require('ytdl-core');
const fs = require('fs');
const app = express();
const port = 3000;

// Change this line to specify the quality you want, e.g., 'highestvideo' or 'hd720'
const qualityOption = 'hd720';

app.get('/download', async (req, res) => {
  try {
    const videoURL = req.query.url;

    if (!videoURL) {
      return res.status(400).send('Video URL ki kami hai');
    }

    const info = await ytdl.getInfo(videoURL);
    const videoTitle = info.videoDetails.title;
    const autoTitle = videoTitle.replace(/[^\w\s]/gi, '');
    const sanitizedTitle = autoTitle || 'audio';

    // Modify the options to specify the quality
    const options = {
      quality: qualityOption,
    };

    res.setHeader('Content-Disposition', `attachment; filename="${sanitizedTitle}.mp4"`);
    res.setHeader('Content-Type', 'video/mp4');

    ytdl(videoURL, options).pipe(res);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server port ${port} par chalu hai`);
});
