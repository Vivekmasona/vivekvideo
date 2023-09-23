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

    // Get information about the video (including the title and file size)
    const info = await ytdl.getInfo(videoURL);
    const videoTitle = info.videoDetails.title;
    const autoTitle = videoTitle.replace(/[^\w\s]/gi, ''); // Remove special characters from the title
    const sanitizedTitle = autoTitle || 'video'; // Use the sanitized title or 'video' as a default
    const videoFilesize = info.formats[0].contentLength; // Get the video file size in bytes

    // Convert the file size to megabytes
    const fileSizeInMB = (videoFilesize / 1024 / 1024).toFixed(2);

    // Respond with the estimated file size to the user
    res.send(`Estimated download size: ${fileSizeInMB} MB`);

    // You can also choose to initiate the download here if the user confirms

  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
