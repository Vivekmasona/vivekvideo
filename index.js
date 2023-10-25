const express = require('express');
const ytdl = require('ytdl-core');
const fs = require('fs');
const app = express();
const port = 3000; // You can change this to the desired port

app.get('/mp4', (req, res) => {
  // Get the video URL from the query parameter 'url'
  const videoUrl = req.query.url;

  // Check if the 'url' parameter is provided
  if (!videoUrl) {
    return res.status(400).send('Please provide a valid video URL.');
  }

  // Get video info to extract the video title
  ytdl.getBasicInfo(videoUrl, (err, info) => {
    if (err) {
      console.error('Error:', err);
      return res.status(500).send('An error occurred while fetching video information.');
    }

    const videoTitle = info.title;

    // Set the options for downloading audio
    const options = {
      quality: 'highestaudio',
      filter: 'audioonly',
    };

    // Create a readable stream from the video URL
    const stream = ytdl(videoUrl, options);

    // Set the filename for the downloaded audio file with the video title
    const filename = `${videoTitle}.mp3`;

    // Create a writable stream to save the audio
    const output = fs.createWriteStream(filename);

    // Pipe the readable stream to the writable stream
    stream.pipe(output);

    // Handle the end event when the download is complete
    output.on('finish', () => {
      res.download(filename, (err) => {
        if (err) {
          console.error('Error:', err);
          res.status(500).send('An error occurred while downloading the audio.');
        } else {
          console.log('Download complete.');
          // Clean up the temporary file
          fs.unlinkSync(filename);
        }
      });
    });

    // Handle errors
    stream.on('error', (err) => {
      console.error('Error:', err);
      res.status(500).send('An error occurred while processing the video URL.');
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

