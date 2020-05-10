const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const connectDB = require('./config/db');

connectDB(); // Connect Database
const app = express();

app.use(express.json({ extended: false }));
app.use(cookieParser());

app.use('/api/users', require('./routes/usersRoute'));
app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/profile', require('./routes/profileRoute'));
app.use('/api/posts', require('./routes/postsRoute'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('frontend/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));