const express = require('express');
const ytdl = require('ytdl-core');
const app = express();
const port = 3000;

app.get('/download', async (req, res) => {
  try {
    const videoURL = req.query.url; // Get the YouTube video URL from the query parameter
    if (!videoURL) {
      return res.status(400).send('Please provide a valid YouTube video URL.');
    }

    // Get the video info to retrieve the title
    const info = await ytdl.getInfo(videoURL);
    const videoTitle = info.videoDetails.title;

    // Set the response headers for video download
    res.header('Content-Disposition', `attachment; filename="${videoTitle}.mp4"`);
    ytdl(videoURL, {
      format: 'mp4',
    }).pipe(res);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred while processing your request.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
