// ---------------- Klasse Library ------------------ //

class Library {
  constructor() {
    this._books = [];
  }

  get books() {
    return [...this._books];
  }

  set books(newBooks) {
    if (
      Array.isArray(newBooks) &&
      newBooks.every((book) => book instanceof Book)
    ) {
      this._books = newBooks;
    } else {
      console.error("Die Bücher müssen in einem Array gespeichert werden.");
    }
  }

  addBook(book) {
    if (book.title && book.author) {
      this._books.push(book);
    } else {
      console.error(
        "Ein Buch benötigt mindestens einen Titel und einen Autor."
      );
    }
  }

  findTitle(title) {
    return this._books.filter(
      (book) => book.title.toLowerCase() === title.toLowerCase()
    );
  }

  listBooks() {
    this._books.forEach((book) => console.log(book.getInfo()));
  }

  listUnreadBooks() {
    const unreadBooks = this._books.filter((book) => !book.readStatus);
    unreadBooks.forEach((book) => console.log(book.getInfo()));
  }

  removeTitle(title) {
    this._books = this._books.filter(
      (book) => book.title.toLowerCase() !== title.toLowerCase()
    );
  }

  findByGenre(genre) {
    return this._books.filter(
      (book) => book.genre.toLowerCase() === genre.toLowerCase()
    );
  }
}
