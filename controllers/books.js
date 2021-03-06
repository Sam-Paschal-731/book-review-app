const Book = require('../models/book');
const Genre = require('../models/genre')

module.exports = {
    index,
    new: newBook,
    create,
    show,
    addToGenres,
    byAll,
    edit,
    update : updateBook
}

function index(req, res) {
    Book.find({}, function(err, books) {
        console.log(books)
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
    Book.findById(req.params.id)
        .populate('genres').exec(function(err, book) {
            Genre.find(
              {
                _id: {
                  $nin: book.genres
                }
              },
        function(err, genres) {
        res.render('books/show', {title: 'Book Details', book, genres})
        })   
    })
}

function addToGenres(req, res) {
    Book.findById(req.params.id, function(err, book) {
        book.genres.push(req.body.genreId)
        book.save(function(err) {
          res.redirect(`/books/${book._id}`)
        })
      })
}


function byAll(req, res) {
    Book.find({title: req.query.title}, function(err, books) {
            res.render('books/index', {
                books,
                user: req.user,
                titleSearch: req.query.title,
                title: "All Books"
            })
        }), Book.find({author: req.query.author}, function(err, books) {
            res.render('books/index', {
                books,
                user: req.user,
                authorSearch: req.query.author,
                title: "All Books"
        })     
})
}

function edit(req, res) {
    Book.findById(req.params.id, function(err, book) {
        res.render('books/edit', {title: 'Edit books', book});
    })
    
}

function updateBook(req, res) {
    Book.findById(req.params.id, function (err, book) {
        book.title = req.body.title,
        book.author = req.body.author
        book.country = req.body.country
        book.language = req.body.language
        book.publisher = req.body.publisher
        book.publicationDate = req.body.publicationDate
        book.pages = req.body.pages
        book.save(function(err) {
        res.redirect(`/books/${book._id}`);
      });
    })
}
