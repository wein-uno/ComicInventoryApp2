const express = require('express');
const { body, validationResult } = require('express-validator');
const { getComics, addComic, editComic, deleteComic, getComicById, getRandomComic } = require('../controllers/comicsController');
const router = express.Router();

const { authenticate, authorizeGroups } = require('../middleware/auth');//part of the authentication stuff

router.get('/', getComics);
router.post('/', addComic);
router.get('/:id', getComicById);
router.put('/:id', editComic);
router.delete('/:id', deleteComic);
router.get('/random', getRandomComic); // Random comic route
//router.get('/random', comicsController.getRandomComic); // Random comic route

// Anonymous route (no authentication needed)
router.get('/public-list', (req, res) => {
    // Return some public info
    res.json({ message: 'Public comic list' });
  });
  
  // Application user route (must be logged in and in "application" group)
  router.get('/my-comics', authenticate, authorizeGroups(['application']), (req, res) => {
    // Return user-specific comics
    res.json({ message: 'Your comics as application user' });
  });
  
  // Super user route (must be logged in and in "super user" group)
  router.post('/admin-action', authenticate, authorizeGroups(['super user']), (req, res) => {
    // Perform super user action
    res.json({ message: 'Super user action performed' });
  });

module.exports = router;
