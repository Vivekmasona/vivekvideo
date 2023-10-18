const express = require('express');
const ytdl = require('ytdl-core');
const app = express();
const port = 3000; // Replace with your desired port number

app.get('/audio', (req, res) => {
  const videoURL = req.query.url;

  if (!videoURL) {
    return res.status(400).send('Please provide a valid YouTube video URL.');
  }

  if (ytdl.validateURL(videoURL)) {
    const audioStream = ytdl(videoURL, {
      quality: 'lowestaudio', // You can adjust the quality as needed
    });

    // Generate a Google Play Music playback link
    const googlePlayLink = `https://play.google.com/music/m/${generateTrackId(videoURL)}`;

    res.json({
      googlePlayLink,
      audioStreamUrl: audioStream.url,
    });
  } else {
    res.status(400).send('Invalid YouTube URL');
  }
});

function generateTrackId(videoURL) {
  // Logic to generate a unique track ID, e.g., from the video URL
  // You can implement your own logic to generate a track ID here
  return 'your_generated_track_id';
}

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

