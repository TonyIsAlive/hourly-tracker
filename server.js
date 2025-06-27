const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// User management (mock database)
let users = {};
let adminCredentials = { username: 'admin', password: 'admin123' };

// Admin login
app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === adminCredentials.username && password === adminCredentials.password) {
    res.json({ success: true });
  } else {
    res.status(403).json({ success: false, message: 'Forbidden' });
  }
});

// User management routes
app.post('/admin/create-user', (req, res) => {
  const { username, password } = req.body;
  users[username] = password;
  res.json({ success: true });
});

app.post('/admin/change-password', (req, res) => {
  const { username, newPassword } = req.body;
  if (users[username]) {
    users[username] = newPassword;
    res.json({ success: true });
  } else {
    res.status(404).json({ success: false, message: 'User  not found' });
  }
});

// File upload route
app.post('/upload', upload.array('rejectionImages', 10), (req, res) => {
  res.json({ success: true, files: req.files });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
