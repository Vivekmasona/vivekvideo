const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the "images" directory
app.use(express.static('images'));

// Define a route to get a random image URL
app.get('/random-image', (req, res) => {
  // Get a list of image files in the "images" directory
  const imageFiles = ['/img/image1.jpg', '/img/image2.jpg', 'img/image3.jpg']; // Add your image filenames here

  // Generate a random index to select a random image
  const randomIndex = Math.floor(Math.random() * imageFiles.length);

  // Construct the URL for the random image
  const randomImageUrl = `/images/${imageFiles[randomIndex]}`;

  res.json({ imageUrl: randomImageUrl });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

