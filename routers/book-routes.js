const express = require('express');
const { getAllBooks,
    singleBookById,
    addNewBook,
    updateBook,
    deleteBook } = require('../controller/book-controller');

    
// create express roputer
const router = express.Router();

//  all the routes that are related to books only

router.get('/get',getAllBooks);
router.get('/get/:id',singleBookById);
router.post('/add',addNewBook);
router.put('/update/:id',updateBook);
router.delete('/delete/:id',deleteBook);

module.exports = router;