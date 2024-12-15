const express = require('express');
const { getComics, addComic, editComic, deleteComic, getComicById, getRandomComic } = require('../controllers/comicsController');
const router = express.Router();

router.get('/', getComics);
router.post('/', addComic);
router.get('/:id', getComicById);
router.put('/:id', editComic);
router.delete('/:id', deleteComic);
router.get('/random', getRandomComic); // Random comic route
//router.get('/random', comicsController.getRandomComic); // Random comic route
module.exports = router;
