const express = require('express');
const ytdl = require('ytdl-core');

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
            res.status(200).send(audioFormat.url);
        } else {
            res.status(500).send('No suitable audio format found');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
