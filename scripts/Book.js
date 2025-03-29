// ---------------- Klasse Book ------------------ //

class Book {
  constructor(title, author, pages, genre = "Uncategorized", description) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = false;
    this.genre = genre;
    this.description = description || "No description available";
  }

  getInfo() {
    const readStatus = this.readStatus ? `Gelesen` : `Ungelesen`;
    return `Titel: ${this.title}, Autor: ${this.author}, Seiten: ${this.pages}, Genre: ${this.genre}, Status: ${readStatus}, Beschreibung: ${this.description}`;
  }

  markAsRead() {
    this.readStatus = true;
  }

  markAsUnread() {
    this.readStatus = false;
  }
}
