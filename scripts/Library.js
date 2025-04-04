// ---------------- Klasse Library ------------------ //

class Library {
  constructor() {
    this.books = [];  // Array zum Speichern der Bücher
  }

  addBook(book) {
    if (book.title && book.author) {
      this.books.push(book);  // Fügt das Buch in das Array ein
    } else {
      console.error("Buch benötigt einen Titel und einen Autor.");
    }
  }

  listBooks() {
    this.books.forEach((book) => {
      console.log(book.getInfo());  // Ruft für jedes Buch die Info auf und gibt sie aus
    });
  }

  findTitle(title) {
    return this.books.filter((book) => book.title.toLowerCase() === title.toLowerCase());
  }

  findByGenre(genre) {
    return this.books.filter((book) => book.genre.toLowerCase() === genre.toLowerCase());
  }

  listUnreadBooks() {
    const unreadBooks = this.books.filter((book) => !book.readStatus);
    unreadBooks.forEach((book) => console.log(book.getInfo()));
  }

  removeTitle(title) {
    this.books = this.books.filter((book) => book.title.toLowerCase() !== title.toLowerCase());
  }
}

