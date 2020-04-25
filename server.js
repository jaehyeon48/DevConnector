const express = require('express');

const connectDB = require('./config/db');

connectDB(); // Connect Database
const app = express();

app.use(express.json({ extended: false }));

app.get('/', (req, res, next) => res.send('API Running'));

app.use('/api/users', require('./routes/usersRoute'));
app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/profile', require('./routes/profileRoute'));
app.use('/api/posts', require('./routes/postsRoute'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));