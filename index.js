const express = require('express');
const ytdl = require('ytdl-core');
const app = express();
const port = 3000; // Replace with your desired port number

app.get('/get', (req, res) => {
  const videoUrl = req.query.url;

  if (!videoUrl) {
    return res.status(400).send('Missing "url" query parameter');
  }

  // Use the `ytdl.getBasicInfo` function to fetch video details, including the title and thumbnail.
  ytdl.getBasicInfo(videoUrl, (err, info) => {
    if (err) {
      console.error('Error fetching video info:', err);
      res.status(500).send('Error fetching video info');
    } else {
      // Access the video title and thumbnail URL from the `info` object.
      const videoTitle = info.title;
      const thumbnailUrl = info.player_response.videoDetails.thumbnail.thumbnails[0].url;
      
      // Create an object with video information.
      const videoInfo = {
        title: videoTitle,
        thumbnailUrl: thumbnailUrl,
      };
      
      // Send the video information as JSON response.
      res.json(videoInfo);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
                    
