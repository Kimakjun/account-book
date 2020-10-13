const express = require('express');
const {
    getCategories, 
    addCategories,
    deleteCategories
} = require('../controller/category');
const {asyncErrorHandler} = require('../util/error');


const router = express.Router();

router.get('/', asyncErrorHandler(getCategories));
router.post('/', asyncErrorHandler(addCategories));
// DELETE CATEGORY/2
router.delete('/:id', asyncErrorHandler(deleteCategories));


module.exports = router;