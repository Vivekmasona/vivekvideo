const express = require('express');
const ytdl = require('ytdl-core');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/download', async (req, res) => {
    const url = req.body.url;
    if (!ytdl.validateURL(url)) {
        res.send('Invalid YouTube URL.');
        return;
    }

    const info = await ytdl.getInfo(url);
    const title = info.videoDetails.title;

    // For audio download
    const audio = ytdl(url, { quality: 'highestaudio' });

    audio.pipe(res, {
        'content-disposition': `attachment; filename="${title}.mp3"`,
        'Content-Type': 'audio/mpeg',
    });
});

app.get('/video', (req, res) => {
    const url = req.query.url;
    if (!ytdl.validateURL(url)) {
        res.send('Invalid YouTube URL.');
        return;
    }

    const title = 'video';
    const video = ytdl(url, { quality: 'highestvideo' });

    res.setHeader('Content-Disposition', `attachment; filename="${title}.mp4"`);
    res.setHeader('Content-Type', 'video/mp4');
    video.pipe(res);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

