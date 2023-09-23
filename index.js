const express = require('express');
const ytdl = require('ytdl-core');
const app = express();
const port = 3000;

app.get('/size', async (req, res) => {
  try {
    const videoURL = req.query.url; // Get the YouTube video URL from the query parameter

    if (!videoURL) {
      return res.status(400).send('Missing video URL');
    }

    // Get information about the video (including the title and file size)
    const info = await ytdl.getInfo(videoURL);
    const videoTitle = info.videoDetails.title;
    const autoTitle = videoTitle.replace(/[^\w\s]/gi, ''); // Remove special characters from the title
    const sanitizedTitle = autoTitle || 'video'; // Use the sanitized title or 'video' as a default
    const videoFilesize = info.formats[0].contentLength; // Get the video file size in bytes

    // Convert the file size to megabytes
    const fileSizeInMB = (videoFilesize / 1024 / 1024).toFixed(2);

    // Create a download link for the user
    const downloadLink = `<a href="/download-video?url=${encodeURIComponent(videoURL)}">Download "${sanitizedTitle}.mp4" (${fileSizeInMB} MB)</a>`;

    // Display the estimated download size and link to the user
    res.send(`Estimated download size: ${fileSizeInMB} MB<br>${downloadLink}`);

  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/download', (req, res) => {
  const videoURL = req.query.url;

  if (!videoURL) {
    return res.status(400).send('Missing video URL');
  }

  // Set response headers for the video download
  res.setHeader('Content-Disposition', `attachment; filename="video.mp4"`);
  res.setHeader('Content-Type', 'video/mp4');

  // Pipe the video stream into the response
  ytdl(videoURL, { quality: 'highestvideo' }).pipe(res);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
