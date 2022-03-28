const Book = require('../models/book');

module.exports = {
    index,
    new: newBook,
    create,
    show
}

function index(req, res) {
    Book.find({}, function(err, books) {
        res.render('books/index', {title: 'All Books', books})
    })
}

function newBook(req, res) {
    res.render('books/new', {title: 'Add Books'});
}

function create(req, res) {
    const book = new Book(req.body);
    book.save(function(err) {
        if (err) return res.render('books/new');
        res.redirect('/books')
    })
}

function show(req, res) {
    Book.findById(req.params.id, function(err, book) {
        res.render('books/show', {title: 'Book Details', book})
    });
}