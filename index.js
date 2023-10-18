const express = require('express');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const opusscript = require('opusscript');
const fs = require('fs');

const app = express();
const port = 3000;

app.get('/play', (req, res) => {
  const videoURL = req.query.url;
  const outputPath = 'output.opus';

  if (!videoURL) {
    res.status(400).send('Missing YouTube video URL');
    return;
  }

  // Create a readable stream from the YouTube video
  const stream = ytdl(videoURL, {
    filter: format => format.container === 'opus' && format.encoding === 'opus',
  });

  const output = fs.createWriteStream(outputPath);

  // Pipe the YouTube video stream to the output file
  stream.pipe(output);

  output.on('finish', () => {
    console.log('Audio file downloaded.');

    // Play the Opus audio
    const opus = new opusscript.OpusEncoder();
    const input = fs.createReadStream(outputPath);
    const proc = new ffmpeg({ source: input })
      .fromFormat('opus')
      .toFormat('wav')
      .pipe()
      .audioCodec('pcm_s16le')
      .audioFrequency(48000)
      .audioChannels(2);

    // Stream the audio to the response
    proc.stdout.pipe(opus.encoder())
      .pipe(res);
  });

  output.on('error', (err) => {
    console.error('Error downloading audio:', err);
    res.status(500).send('Error downloading audio');
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

