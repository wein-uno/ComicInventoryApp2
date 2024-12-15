const mysql = require('mysql');
const multer = require('multer');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

// Multer setup for image upload
const upload = multer({
    storage: multer.memoryStorage()
}).single('image');

//get comics
const getComics = (req, res) => {
    const query = 'SELECT id, title, number, grade, value, image FROM comics';
    db.query(query, (err, results) => {
        if (err) throw err;

        // Convert BLOB to base64
        const comics = results.map(comic => {
            if (comic.image) {
                comic.image = Buffer.from(comic.image).toString('base64');
            }
            return comic;
        });

        res.json(comics);
    });
};


// Add new comic
const addComic = (req, res) => {
    upload(req, res, (err) => {
        if (err) return res.status(500).send(err);
        const { title, number, grade, value } = req.body;
        const image = req.file ? req.file.buffer : null;

        const query = 'INSERT INTO comics (title, number, grade, value, image) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [title, number, grade, value, image], (err, result) => {
            if (err) throw err;
            res.json({ id: result.insertId });
        });
    });
};

// Get comic by id
const getComicById = (req, res) => {
    const query = 'SELECT * FROM comics WHERE id = ?';
    db.query(query, [req.params.id], (err, result) => {
        if (err) throw err;
        res.json(result[0]);
    });
};

// Edit comic
const editComic = (req, res) => {
    const { title, number, grade, value } = req.body;
    const query = 'UPDATE comics SET title = ?, number = ?, grade = ?, value = ? WHERE id = ?';
    db.query(query, [title, number, grade, value, req.params.id], (err) => {
        if (err) throw err;
        res.send('Comic updated successfully');
    });
};

// Delete comic
const deleteComic = (req, res) => {
    const query = 'DELETE FROM comics WHERE id = ?';
    db.query(query, [req.params.id], (err) => {
        if (err) throw err;
        res.send('Comic deleted successfully');
    });
};

//get Random comic
const getRandomComic = (req, res) => {
    const query = 'SELECT id, title, number, grade, value, image FROM comics ORDER BY RAND() LIMIT 1';
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error' });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'No comics found' });
        }
        res.json(result[0]); // Send a single random comic
    });
};

module.exports = { getComics, addComic, editComic, deleteComic, getComicById, getRandomComic };
