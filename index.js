const express = require('express');
const multer = require('multer');
const pool = require('./db');
const app = express();
const PORT = 3000;

// Configure Multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload CV - POST /api/cv/upload
app.post('/api/cv/upload', upload.single('cv'), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).send('No file uploaded.');
    }

    const query = `
      INSERT INTO cv_db (filename, filetype, data, uploadedat)
      VALUES ($1, $2, $3, NOW())
      RETURNING id
    `;
    const values = [file.originalname, file.mimetype, file.buffer];

    const result = await pool.query(query, values);
    res.status(201).json({ message: 'CV uploaded successfully.', id: result.rows[0].id });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).send('Error uploading file.');
  }
});

// Get All CVs - GET /api/cv/all
app.get('/api/cv/all', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, filename, filetype, uploadedat FROM cv_db ORDER BY uploadedat DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Get all error:', error);
    res.status(500).send('Error fetching data.');
  }
});

// Download CV by ID - GET /api/cv/download/:id
app.get('/api/cv/download/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const result = await pool.query('SELECT filename, filetype, data FROM cv_db WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).send('CV not found.');
    }

    const file = result.rows[0];
    res.setHeader('Content-Disposition', `attachment; filename="${file.filename}"`);
    res.setHeader('Content-Type', file.filetype);
    res.send(file.data);
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).send('Error downloading file.');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})