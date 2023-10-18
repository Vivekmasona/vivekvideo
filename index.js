const express = require('express');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');

const app = express();
const port = 3000;

app.get('/play', (req, res) => {
    const ytLink = req.query.url;

    if (!ytLink) {
        return res.status(400).send('Missing YouTube URL');
    }

    // Get video info
    ytdl.getInfo(ytLink, (err, info) => {
        if (err) {
            return res.status(500).send('Error fetching video information');
        }

        // Get the highest quality audio stream
        const audioFormat = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });

        if (audioFormat) {
            const audioStream = ytdl(ytLink, { format: audioFormat });

            // Create a writable stream to save the audio
            const audioOutput = fs.createWriteStream('output.mp3');

            audioStream.pipe(audioOutput);

            audioOutput.on('finish', () => {
                // Send the audio file as a response
                res.download('output.mp3', 'audio.mp3', (err) => {
                    if (err) {
                        console.error('Error sending audio:', err);
                        res.status(500).send('Error sending audio');
                    } else {
                        console.log('Audio extraction and response complete.');
                    }
                });
            });

            audioOutput.on('error', (err) => {
                console.error('Error saving audio:', err);
                res.status(500).send('Error saving audio');
            });
        } else {
            res.status(500).send('No suitable audio format found');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

