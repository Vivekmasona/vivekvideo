const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('images'));

app.get('/ai', (req, res) => {
  const imageFiles = ['/img/image1.jpg', '/img/image2.jpg', '/img/image3.jpg']; // Add your image filenames here
  const randomIndex = Math.floor(Math.random() * imageFiles.length);
  const randomImageFileName = imageFiles[randomIndex];

  // Set the appropriate content type for the image
  res.setHeader('Content-Type', 'image/jpeg'); // Modify this based on your image type (e.g., image/png for PNG images)

  // Send the image file
  res.sendFile(`${__dirname}/images/${randomImageFileName}`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

