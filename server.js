const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Cria o app express
const app = express();

// Configuração de armazenamento do multer (pasta 'uploads')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = './uploads';
    if (!fs.existsSync(uploadDir)){
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  }
});

const upload = multer({ storage: storage });

// Serve a página HTML
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Upload Video</title>
    </head>
    <body>
      <h1>Upload Video</h1>
      <form action="/upload" method="post" enctype="multipart/form-data">
        <input type="file" name="video" accept="video/*" required>
        <button type="submit">Upload Video</button>
      </form>
    </body>
    </html>
  `);
});

// Rota para receber o upload do vídeo
app.post('/upload', upload.single('video'), (req, res) => {
  console.log('Video file uploaded:', req.file);
  res.send('Video uploaded successfully!');
});

// Inicia o servidor na interface 0.0.0.0 e porta 3000
app.listen(3000, '0.0.0.0', () => {
  console.log('Server running at http://0.0.0.0:3000');
});
