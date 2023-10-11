const express = require('express');
const app = express();
const fs = require('fs');
const fluentFFmpeg = require('fluent-ffmpeg');

app.get('/download', (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) {
    res.status(400).send('Please provide a valid video URL');
    return;
  }

  const outputFileName = 'output.mp3';

  fluentFFmpeg()
    .input(videoUrl)
    .audioCodec('libmp3lame') // Set the audio codec to MP3
    .toFormat('mp3') // Convert to MP3 format
    .on('end', () => {
      res.download(outputFileName, (err) => {
        if (err) {
          console.error('Error:', err);
          res.status(500).send('An error occurred during download');
        }
        // Delete the temporary MP3 file after sending it to the client
        fs.unlink(outputFileName, (err) => {
          if (err) {
            console.error('Error:', err);
          }
        });
      });
    })
    .on('error', (err) => {
      console.error('Error:', err);
      res.status(500).send('An error occurred during conversion');
    })
    .save(outputFileName);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
