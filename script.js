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

    // first clear the shelves
    shelves.innerHTML = "";

    for (let i = 0; i < library.length; i++) {
        // book object we are using
        const book = library[i];
        // create a div element for the book and append the
        // book info text to the element
        const newBook = document.createElement("div");

        // create button for removing book
        const removeBtn = document.createElement("button");
        removeBtn.innerHTML = "Remove";
        removeBtn.classList.add("remove");
        removeBtn.addEventListener("click", (e) => {
            e.preventDefault();
            library.splice(i, 1);
            displayAllBooks();
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
            displayAllBooks();
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
    addBookToLibrary(title.value, author.value, pages.value, read);
    displayAllBooks();

    // re-hide the form and un-hide the new book button
    const newBookBtn = document.querySelector("#btnNewBook");
    const formContainer = document.querySelector(".form-container");
    formContainer.toggleAttribute("hidden");
    newBookBtn.toggleAttribute("hidden");

});

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("Harry Potter", "J.K. Rowling", 400, false);
displayAllBooks();


