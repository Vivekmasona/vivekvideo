const express = require('express');
const app = express();
const ytdl = require('ytdl-core');
const fs = require('fs');
const NodeID3 = require('node-id3'); // Library for ID3 tag manipulation

const port = 3000; // Change this to your desired port number

// Define a route that handles GET requests with parameters
app.get('/download-audio', (req, res) => {
  const videoUrl = req.query.videoUrl; // Get the video URL from the query parameters
  const outputFilePath = 'output.mp3'; // Change this to your desired output file name

  // Use the YouTube Data API to fetch video metadata (title, length, size, tags)
  // Assuming you have fetched the metadata as 'metadata'

  // Download audio using ytdl-core
  ytdl(videoUrl, { filter: 'audioonly' })
    .pipe(fs.createWriteStream(outputFilePath))
    .on('finish', () => {
      console.log('Audio downloaded successfully.');

      // Add metadata to the downloaded audio file
      NodeID3.write(metadata, outputFilePath, (error) => {
        if (error) {
          console.error('Error adding metadata:', error);
          res.status(500).send('Error adding metadata');
        } else {
          console.log('Metadata added successfully.');
          res.status(200).send('Metadata added successfully');
        }
      });
    })
    .on('error', (error) => {
      console.error('Error:', error);
      res.status(500).send('Error downloading audio');
    });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
