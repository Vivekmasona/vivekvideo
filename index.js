const express = require('express');
const ytdl = require('ytdl-core');
const app = express();

// Define a route that handles the YouTube URL parameter
app.get('/play', (req, res) => {
  const url = req.query.url;

  // Check if the URL is a valid YouTube video URL
  if (ytdl.validateURL(url)) {
    // Get the title of the YouTube video
    ytdl.getBasicInfo(url, (err, info) => {
      if (err) {
        console.error('Error fetching video info:', err);
        return res.status(500).send('Error fetching video info');
      }

      const videoTitle = info.title;

      // Stream the audio of the YouTube video
      const stream = ytdl(url, { filter: 'audioonly' });
      stream.pipe(res);

      // Create and show a Chrome notification with the video title
      if ('Notification' in global) {
        Notification.requestPermission().then(function (permission) {
          if (permission === 'granted') {
            const notification = new Notification('Now Playing', {
              body: videoTitle,
            });
          }
        });
      }
    });
  } else {
    res.status(400).send('Invalid YouTube URL');
  }
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

