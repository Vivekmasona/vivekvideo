const express = require('express');
const ytdl = require('ytdl-core');
const fs = require('fs');
const app = express();
const port = 3000;

app.get('/download', async (req, res) => {
  try {
    const videoURL = req.query.url; // Query parameter se YouTube video URL prapt karein

    if (!videoURL) {
      return res.status(400).send('Video URL ki kami hai');
    }

    // Video ke baare mein jaankari prapt karein (title shamil hai)
    const info = await ytdl.getInfo(videoURL);
    const videoTitle = info.videoDetails.title;
    const autoTitle = videoTitle.replace(/[^\w\s]/gi, ''); // Title se special characters ko hatakar sanitized title taiyar karein
    const sanitizedTitle = autoTitle || 'audio'; // Sanitized title ya 'audio' (agar title mein special characters the) ko default ke roop mein istemal karein

    // Response headers ko set karein taki ek downloadable file auto-generated title ke saath specified ho
    res.setHeader('Content-Disposition', `attachment; filename="${sanitizedTitle}.mp4"`);
    res.setHeader('Content-Type', 'video/mp4');

    // Video stream ko response mein pipe karein, jisse download shuru ho
    ytdl(videoURL, { quality: 'highestvideo' }).pipe(res);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server port ${port} par chalu hai`);
});
