const express = require('express');
const app = express();

// Define a route that handles the GET request
app.get('/player', (req, res) => {
  // Get the URL parameter
  const urlParam = req.query.url;

  // Use the URL parameter to select elements
  const playerBtn = `#${urlParam} button`;
  const footBtn = `#${urlParam} button`;
  const controls = urlParam;
  const controlBtn = `#${urlParam} button`;
  const volume = 'volume';
  const progress = 'progress';
  const playbackSpeed = 'playback-speed';
  const input = 'input[type="text"]';
  const audio = 'audio';
  const img = 'img';
  const array = []; // url storage
  //const play = localStorage.getItem('play');
  const metadata = `https://noembed.com/embed?dataType=json&url=${urlParam}`;
  const title = 'h3';
  
  // Create a thumbnail URL based on the URL parameter
  const thumbnailUrl = `https://img.youtube.com/vi/${urlParam}/0.jpg`;

  // Create an HTML template with the selected elements and thumbnail
  const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
      <!-- Your head content here -->
    </head>
    <body>
      <button>${playerBtn}</button>
      <button>${footBtn}</button>
      <div id="${controls}">
        <button>${controlBtn}</button>
      </div>
      <input type="text" value="${input}">
      <audio src="${audio}"></audio>
      <img src="${thumbnailUrl}" alt="Thumbnail">
      <!-- Rest of your HTML content -->
    </body>
    </html>
  `;

  // Send the HTML response
  res.send(htmlTemplate);
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
