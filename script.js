// main array where the book objects will be stored
const libraryList = [];

// Book constructor
class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    // this was more for testing purposes but
    // I kept it for future use
    info = function() {
        let readString;
        if (read) {
            readString = "has been read."
        } else {
            readString = "not read yet."
        }
        return this.title + " by " + this.author + ", " + this.pages + " pages, " + readString;
    }
}
class Library {
    constructor() { }

    static addBookToLibrary(title, author, pages, read) {
        // create the book
        const newBook = new Book(title, author, pages, read);

        // add the book to the library array
        libraryList.push(newBook);
    }

    static displayAllBooks() {
        // get book shelves element
        const shelves = document.getElementById("book-shelves");

        // first clear the shelves
        shelves.innerHTML = "";

        for (let i = 0; i < libraryList.length; i++) {
            // book object we are using
            const book = libraryList[i];
            // create a div element for the book and append the
            // book info text to the element
            const newBook = document.createElement("div");

            // create button for removing book
            const removeBtn = document.createElement("button");
            removeBtn.innerHTML = "Remove";
            removeBtn.classList.add("remove");
            removeBtn.addEventListener("click", (e) => {
                e.preventDefault();
                libraryList.splice(i, 1);
                Library.displayAllBooks();
            });

            // create change read button
            const toggleReadBtn = document.createElement("button");
            toggleReadBtn.innerHTML = "Toggle Read";
            toggleReadBtn.classList.add("toggleRead");
            toggleReadBtn.addEventListener("click", (e) => {
                e.preventDefault();
                if (book.read) {
                    book.read = false;
                }
                else {
                    book.read = true;
                }
                Library.displayAllBooks();
            });

            // set the class
            newBook.classList.add("book");
            //  and id for the book based on position in library array
            newBook.setAttribute("id", i);


            newBook.innerHTML = `<h4>${book.title}</h4><p>by ${book.author}</p><p>pages: ${book.pages}</p><p>read: ${book.read}</p>`;
            newBook.appendChild(removeBtn);
            newBook.appendChild(toggleReadBtn);

            shelves.appendChild(newBook);
        }
    }

}

// adding click event for new book button
const newBookBtn = document.querySelector("#btnNewBook");
newBookBtn.addEventListener("click", () => {
    const formContainer = document.querySelector(".form-container");
    formContainer.toggleAttribute("hidden");
    // hide the new book button too
    newBookBtn.toggleAttribute("hidden");
});
const submitBtn = document.querySelector("#btnSubmit");
submitBtn.addEventListener("click", (e) => {
    // first prevent the button doing what it's supposed to
    e.preventDefault();

    // grab info
    const title = document.querySelector("#title");
    const author = document.querySelector("#author");
    const pages = document.querySelector("#pages");
    const readYes = document.querySelector("#readYes");

    // check if read or not
    let read;
    if (readYes.checked) {
        read = true;
    }
    else {
        read = false;
    }

    // add and display the book
    Library.addBookToLibrary(title.value, author.value, pages.value, read);
    Library.displayAllBooks();

    // re-hide the form and un-hide the new book button
    const newBookBtn = document.querySelector("#btnNewBook");
    const formContainer = document.querySelector(".form-container");
    formContainer.toggleAttribute("hidden");
    newBookBtn.toggleAttribute("hidden");

});


Library.addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
Library.addBookToLibrary("Harry Potter", "J.K. Rowling", 400, false);
Library.displayAllBooks();


