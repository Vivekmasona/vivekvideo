const express = require('express');
const ytdl = require('ytdl-core');
const fs = require('fs');
const app = express();
const port = 3000;

app.get('/play', async (req, res) => {
  try {
    // YouTube Live Stream ka video ID ya URL
    const videoID = 'YOUR_YOUTUBE_LIVE_STREAM_VIDEO_ID_OR_URL';

    if (!videoID) {
      return res.status(400).send('Video ID ya URL ki kami hai');
    }

    let videoURL = videoID;
    // Video ID se URL banayein (agar direct URL nahi diya gaya hai)
    if (!videoID.startsWith('https://')) {
      videoURL = `https://www.youtube.com/watch?v=${videoID}`;
    }

    // Video se audio extract karein
    const audioStream = ytdl(videoURL, { quality: 'highestaudio' });

    // Audio stream ko play karein
    const command = ffmpeg()
      .input(audioStream)
      .audioCodec('aac') // Aap codec ko apne requirements ke hisab se set kar sakte hain
      .format('s16le')
      .audioFrequency(44100)
      .audioChannels(2);

    command.pipe(res);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server port ${port} par chalu hai`);
});
