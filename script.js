// main array where the book objects will be stored
const library = [];

// Book constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        let readString;
        if (read) {
            readString = "has been read."
        } else {
            readString = "not read yet."
        }
        return this.title + " by " + this.author + ", " + this.pages + " pages, " + readString;
    }
}

function addBookToLibrary(title, author, pages, read) {
    // create the book
    const newBook = new Book(title, author, pages, read);

    // add the book to the library array
    library.push(newBook);
}

function displayAllBooks() {
    // get book shelves element
    const shelves = document.getElementById("book-shelves");

    for (let i = 0; i < library.length; i++) {
        // book object we are using
        const book = library[i];
        // create a div element for the book and append the
        // book info text to the element
        const newBook = document.createElement("div");
        const bookInfo = document.createTextNode(book.info());
        newBook.appendChild(bookInfo);

        // set the class
        newBook.classList.add("book");
        //  and id for the book based on position in library array
        newBook.setAttribute("id", i);

        shelves.appendChild(newBook);
    }
}

for (let i = 0; i < 20; i++) {

    addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
}
addBookToLibrary("Harry Potter", "J.K. Rowling", 400, false);
displayAllBooks();
