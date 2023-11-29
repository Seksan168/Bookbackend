const sql = require("./db")
const Book = function(books){
    this.book_title = books.title;
    this.book_language = books.language;
    this.book_publication_date = books.publication;
    this.book_price = books.price;
    this.book_img = books.img;
    this.book_edition = books.edition;
    this.book_stock = books.stock;
    this.Author = books.author;
    this.info = books.info;
}
Book.checkBook = (id, result)=>{
    sql.query(`SELECT * FROM tbl_book WHERE id = ${id}`,(err,res)=>{
        if(err){
            console.log("Error: "+err);
            result(err,null);
            return;
        }
        if(res.length){
            console.log("Found Book: "+ res[0]);
            result(null, res[0]);
            return;
        }
        result({kind: "Book_not_found"},null);
    });
};

Book.create = (newBook, result)=>{
    console.log('Create new book from this data:',newBook);
    sql.query("INSERT INTO tbl_book SET ?", newBook, (err, res)=>{
        if(err){
            console.log("Query error: "+err);
            result(err, null);
            return;
        }
        result(null, {id: res.insertId,...newBook});
        console.log("Created books:", {id: res.insertId,...newBook});
    });
};

Book.getAllBook = (result)=>{
    sql.query("SELECT * FROM tbl_book", (err, res)=>{
        if(err){
            console.log("Query err: "+err);
            result(err,null);
            return;
        }
        result(null, res);
    })
};
Book.getById = (id,result) =>{
    sql.query('SELECT * FROM tbl_book WHERE book_id = ?',id,(err,res) =>{
        if (err) {
            console.log('Error: ' + err);
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: 'not_found' }, null);
            return;
        }
        console.log('Your tbl_book with id: ' + id);
        result(null, res);
        console.log(res);

    });
},
Book.searchBookByTitle = (title, result) => {
    sql.query("SELECT * FROM tbl_book WHERE book_title = ?", [title], (err, res) => {
        if (err) {
            console.error("Error: " + err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("Found Book: " + res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "Book_not_found" }, null);
    });
},
Book.deleteById = (id, result) => {
    sql.query('DELETE FROM tbl_book WHERE id = ?', id, (err, res) => {
        if (err) {
            console.log('Error: ' + err);
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: 'not_found' }, null);
            return;
        }
        console.log('Deleted tbl_book with id: ' + id);
        result(null, res);
    });
};

module.exports = Book;