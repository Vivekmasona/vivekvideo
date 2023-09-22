const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000; // You can change this to any port you prefer

// Define a route for playlist downloads
app.get('/download/:playlistId', (req, res) => {
  const playlistId = req.params.playlistId;

  // Replace this with logic to generate or fetch playlist data
  const playlistData = `Playlist ID: ${playlistId}\nSong 1\nSong 2\nSong 3`;

  // Create a temporary file with the playlist data
  const fileName = `playlist_${playlistId}.txt`;
  fs.writeFileSync(fileName, playlistData);

  // Set the appropriate headers for file download
  res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
  res.setHeader('Content-Type', 'text/plain');

  // Stream the file to the client
  const fileStream = fs.createReadStream(fileName);
  fileStream.pipe(res);

  // Clean up the temporary file after it's sent
  fileStream.on('end', () => {
    fs.unlinkSync(fileName);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

