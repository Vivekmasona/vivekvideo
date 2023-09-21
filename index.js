const express = require('express');
const ffmpeg = require('fluent-ffmpeg');
const app = express();
const port = 3000;

// Define a route to download audio using FFmpeg
app.get('/audio', (req, res) => {
  // Set the input audio file path
  const audioFilePath = 'input_audio.mp3';

  // Create a writable stream for the response
  const outputStream = res;

  // Configure FFmpeg
  ffmpeg()
    .input(audioFilePath)
    .audioCodec('libmp3lame')
    .toFormat('mp3')
    .pipe(outputStream, { end: true });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
