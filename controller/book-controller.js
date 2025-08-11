const Book = require('../models/book')

const getAllBooks = async(req, res) => {
    try {

        const getBook = await Book.find({});
        if(getBook.length > 0)
            return res.status(200).json({
                success:true,
                message:'get all the data',
                data:getBook
            })

        else {
            res.status(404).json({
                success:false,
                message:'no books found'
            });
        }

    }catch(err) {
        return res.status(500).json({
            success:false,
            message:'not able to get books'
        })
    }
}

const singleBookById = async(req,res) => {
    try {

        const bookId = req.params.id;
        const getBookById = await Book.find({_id:bookId});
        if(getBookById) 
            return res.status(201).json({
                success:true,
                message:'fetched book',
                data:getBookById
            });
        
        else 
            return res.status(400).json({
                success:false,
                message:'no book found'
            })

    }catch(err) {
        return res.status(400).json({
                success:false,
                message:'Error in fetching the book details',
                error:err
            })
    }
}

const addNewBook = async(req,res) => {
    try {
        const newBook = req.body;
        const newlyAddedBook = new Book(newBook);
        await newlyAddedBook.save()

        return res.status(201).json({
            success:true,
            message:'new book has been added',
            data:newlyAddedBook
        });

    }catch(err) {
        return res.status(400).json({message:'not able to add new book'})
    }
}

const updateBook = async(req,res) => {
    try {
        const bookId = req.params.id;
        const getBook = await Book.findByIdAndUpdate({_id:bookId},{ $set:{
            title:'updated book title'
        }} )

        if(!getBook) return res.status(400).json({
            success:false,
            message:'book not found'
        })

        await getBook.save();
        return res.status(201).json({
            success:true,
            message:'data updated successfully',
            data:getBook
        })


    }catch(err) {
        return res.status(404).json({
            success:false,
            message:'error in updating the data'
        })
    }
}

const deleteBook = async(req,res) => {
    try {
        const bookId = req.params.id;
        const getBook = await Book.findByIdAndRemove({_id:bookId});
        console.log(getBook)

        if(getBook)
            return res.status(201).json({
                success:true,
                message:'data deleted successfully',
                data:getBook
            })

        else
            return res.status(201).json({
                success:true,
                message:'not able to find the book by id'
            })


    }catch(err) {
        return res.status(403).json({
            success:true,
            message:'error in deleting the book'
        })
    }
}

module.exports = {
    getAllBooks,
    singleBookById,
    addNewBook,
    updateBook,
    deleteBook
};