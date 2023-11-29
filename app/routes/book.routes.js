module.exports = (app)=>{
    const book_controller = require("../controllers/books.controller");
    var router = require("express").Router();
    router.get('/', book_controller.getAllBook);
    router.get('/:id',book_controller.getBookId);
    router.get('/search/:title',book_controller.searchtitle);
    router.post('/add',book_controller.createBook);
    router.get('/:id',book_controller.getBookId);
    router.delete('/:id',book_controller.deleteBook);
    app.use("/api/books", router);
}; 