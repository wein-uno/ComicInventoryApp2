require('dotenv').config();  // Load .env file
const express = require('express');
const cors = require('cors');
const app = express();
const comicsRoutes = require('./routes/comics');

app.use(cors());
app.use(express.json());
app.use('/api/comics', comicsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
