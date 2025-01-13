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

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);
console.log(theHobbit.info());

