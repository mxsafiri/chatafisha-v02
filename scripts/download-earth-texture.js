const fs = require('fs');
const https = require('https');
const path = require('path');

// URL for a public domain Earth texture map
const textureUrl = 'https://eoimages.gsfc.nasa.gov/images/imagerecords/74000/74092/world.200412.3x5400x2700.jpg';
const outputPath = path.join(__dirname, '../public/images/earth-texture.jpg');

console.log('Downloading Earth texture...');

// Create a write stream
const file = fs.createWriteStream(outputPath);

// Download the file
https.get(textureUrl, (response) => {
  response.pipe(file);
  
  file.on('finish', () => {
    file.close();
    console.log(`Earth texture downloaded successfully to ${outputPath}`);
  });
}).on('error', (err) => {
  fs.unlink(outputPath);
  console.error('Error downloading Earth texture:', err.message);
});
