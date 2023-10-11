const express = require('express');
const ytdl = require('ytdl-core');
const fs = require('fs');

const app = express();
const port = 3000;

app.get('/download', (req, res) => {
  const videoUrl = req.query.url;

  // Fetch video information including its title
  ytdl.getInfo(videoUrl, (err, info) => {
    if (err) {
      console.error('Error:', err);
      return res.status(500).send('Error');
    }

    const videoTitle = info.videoDetails.title;
    const outputPath = `${videoTitle}.mp4`;

    // Create a writable stream to save the video
    const videoStream = fs.createWriteStream(outputPath);

    // Download the video with sound
    ytdl(videoUrl, { filter: 'audioandvideo' }).pipe(videoStream);

    videoStream.on('finish', () => {
      res.download(outputPath, (err) => {
        if (err) {
          console.error('Error:', err);
          res.status(500).send('Error');
        } else {
          console.log('Video downloaded and sent successfully.');
        }
      });
    });

    videoStream.on('error', (error) => {
      console.error('Error:', error);
      res.status(500).send('Error');
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
