// ---------------- Klasse Book ------------------ //

class Book {
  constructor(title, author, pages, genre = `Uncategorized`) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = false;
    this.genre = genre;
  }

  getInfo() {
    const readStatus = this.readStatus ? `Gelesen` : `Ungelesen`;
    return `Titel: ${this.title}, Author: ${this.author}, Seiten: ${this.pages},Genre: ${this.genre}, Status: ${readStatus}`;
  }

  markAsRead() {
    this.readStatus = true;
  }
}

