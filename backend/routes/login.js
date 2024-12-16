const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../db'); // Your DB connection
require('dotenv').config();

router.post('/', (req, res) => {
  const { username, password } = req.body;

  const userQuery = `SELECT id, password_hash FROM users WHERE username = ?`;
  db.query(userQuery, [username], async (err, results) => {
    if (err) return res.status(500).json({error: 'Database error'});
    if (results.length === 0) return res.status(401).json({error: 'Invalid credentials'});

    const user = results[0];
    const validPassword = await bcrypt.compare(password, user.password_hash);

    if (!validPassword) {
      return res.status(401).json({error: 'Invalid credentials'});
    }

    // Fetch user groups
    const groupsQuery = `
      SELECT g.name
      FROM thegroups g
      JOIN user_groups ug ON g.id = ug.group_id
      WHERE ug.user_id = ?
    `;

    db.query(groupsQuery, [user.id], (err, groupResults) => {
      if (err) return res.status(500).json({error: 'Database error'});
      const thegroups = groupResults.map(grp => grp.name);

      const token = jwt.sign(
        { userId: user.id, thegroups },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.json({ token });
    });
  });
});

module.exports = router;
