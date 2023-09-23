const express = require('express');
const ytdl = require('ytdl-core-discord'); // Use ytdl-core-discord
const fs = require('fs');
const app = express();
const port = 3000;

app.get('/download', async (req, res) => {
  try {
    const videoURL = req.query.url; // Get the YouTube video URL from the query parameter

    if (!videoURL) {
      return res.status(400).send('Missing video URL');
    }

    // Get information about the video (including the title, length, and size)
    const info = await ytdl.getInfo(videoURL);
    const videoTitle = info.videoDetails.title;
    const autoTitle = videoTitle.replace(/[^\w\s]/gi, ''); // Remove special characters from the title
    const sanitizedTitle = autoTitle || 'audio'; // Use the sanitized title or 'audio' as a default
    const lengthInSeconds = info.videoDetails.lengthSeconds;
    const fileSizeInBytes = info.videoDetails.lengthBytes;

    // Set response headers to specify a downloadable file with the auto-generated title
    res.setHeader('Content-Disposition', `attachment; filename="${sanitizedTitle}.mp3"`);
    res.setHeader('Content-Type', 'audio/mpeg');

    // Send additional headers for length and size
    res.setHeader('Content-Length', fileSizeInBytes);
    // res.setHeader('X-Video-Length', lengthInSeconds);

    // Pipe the audio stream into the response
    ytdl(videoURL, { filter: 'audioonly' }).pipe(res);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

