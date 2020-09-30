const express = require('express');
const {
    getCategories, 
    addCategories,
    deleteCategories
} = require('../controller/category');

const router = express.Router();

router.get('/', getCategories);
router.post('/', addCategories);
router.delete('/:id', deleteCategories);


module.exports = router;