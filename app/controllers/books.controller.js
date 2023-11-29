// const Book = require("../models/Book.model");

const Book = require("../models/book.model")

const createBook = (req, res) => {
    if(!req.body){
    // if(!req.body.author || !req.body.title){
        res.status(400).send({ message: "Book Title & Author can not be empty."});
    }
    const BookObj = new Book({
        title : req.body.title,
        language : req.body.language,
        publication : req.body.publication,
        price : req.body.price,
        img: req.body.img,
        edition: req.body.edition,
        stock: req.body.stock,
        author : req.body.author,
        info : req.body.info,
    });
    Book.create(BookObj, (err, data)=>{
        if(err){
            res.status(500).send({message: err.message || "Some error occured while creating Book"});
        }else {res.send(data)};
    });
  };

    const getAllBook = (req, res)=>{
    Book.getAllBook((err, data)=>{
    if(err){
        res.status(500).send({message: err.message || "Some error ocurred."});
    }else res.send(data);
});
    };
    // const getBookId = (req, res) => {
    //     const BookId = req.params.id;

    // Book.checkBook(BookId, (err, data) => {
    //     if (err) {
    //         if (err.kind === 'not_found') {
    //             res.status(404).send({ message: `Books with id ${BookId} not found. `});
    //         } else {
    //             res.status(500).send({ message: `Error retrieving recipe with id ${BookId} `});
    //         }
    //     } else {
    //         res.send(data);
    //     }
    // });
    // };

    const getBookId = (req, res) => {
        const findById = req.params.id;
        Book.getById(findById, (err, data) => {
            if (err) {
                if (err.kind === 'not_found') {
                    res.status(404).send({ message: `Books with id ${findById} not found. `});
                } else {
                    res.status(500).send({ message: `Error deleting Books with id ${findById} `});
                }
            } else {
                res.send({ message: `Books with id ${findById} was found successfully. `});
            }
        });
    };


    const deleteBook = (req, res) => {
        const findByIdAndRemove = req.params.id;
    
        Book.deleteById(findByIdAndRemove, (err, data) => {
            if (err) {
                if (err.kind === 'not_found') {
                    res.status(404).send({ message: `Books with id ${findByIdAndRemove} not found. `});
                } else {
                    res.status(500).send({ message: `Error deleting Books with id ${findByIdAndRemove} `});
                }
            } else {
                res.send({ message: `Books with id ${findByIdAndRemove} was deleted successfully. `});
            }
        });
    };
    
    const searchtitle = (req, res) => {
        const title = req.params.title;
    
        Book.searchBookByTitle(title, (err, book) => {
            if (err) {
                return res.status(500).json({ error: `Error searching for book: ${err.message}` });
            }
    
            if (!book) {
                return res.status(404).json({ message: `Book with title '${title}' not found` });
            }
    
            res.json({ book });
        });
    };
    
  module.exports = {
    createBook,
    getAllBook,
    getBookId,
    deleteBook,
    getBookId,
    searchtitle,
  };