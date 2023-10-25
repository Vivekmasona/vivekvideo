const express = require('express');
const ytdl = require('ytdl-core');
const app = express();
const port = 3000;

app.get('/download', async (req, res) => {
  try {
    const videoURL = req.query.url; // Get the YouTube video URL from the query parameter

    if (!videoURL) {
      return res.status(400).send('Missing video URL');
    }

    // Get information about the video
    const info = await ytdl.getInfo(videoURL);
    const videoTitle = info.videoDetails.title;
    const autoTitle = videoTitle.replace(/[^\w\s]/gi, ''); // Remove special characters from the title
    const sanitizedTitle = autoTitle || 'video'; // Use the sanitized title or 'video' as a default

    // Select the video format you want (in this case, the 360p quality)
    const videoFormats = ytdl.filterFormats(info.formats, 'videoonly');
    const format = videoFormats.find(format => format.qualityLabel === '360p');

    if (!format) {
      return res.status(404).send('360p video format not found');
    }

    // Set response headers to specify a downloadable video file with the auto-generated title
    res.setHeader('Content-Disposition', `attachment; filename="${sanitizedTitle}.mp4"`);
    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Content-Length', format.contentLength);

    // Pipe the video stream into the response
    ytdl(videoURL, { format }).pipe(res);

  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

