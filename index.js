const express = require('express');
const ytpl = require('node-ytpl');
const app = express();
const port = 3000; // Replace with your desired port number

app.use(express.json());

const infoRouter = express.Router();

infoRouter.route('/playlist').get(async (req, res) => {
  const url = req.query['url'];

  if (!url) {
    return res.status(400).send('No URL provided');
  }

  let id = '';
  try {
    id = await ytpl.getPlaylistID(url);
  } catch (error) {
    console.error('Error fetching playlist ID:', error);
    return res.status(500).send('Error fetching playlist ID');
  }

  if (!id || !ytpl.validateID(id)) {
    return res.status(400).send('Invalid URL');
  }

  try {
    const playlist = await ytpl(url, {
      /**
       * Download full playlist
       * https://github.com/TimeForANinja/node-ytpl#ytplid-options
       */
      pages: Infinity,
    });
    return res.json(playlist);
  } catch (error) {
    console.error('Error downloading playlist:', error);
    return res.status(500).send('Error downloading playlist');
  }
});

app.use('/api', infoRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

