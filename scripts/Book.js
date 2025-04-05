// ---------------- Klasse Book ------------------ //
export class Book {
  constructor(
    title,
    author,
    cover,
    description
  ) {
    this.title = title;
    this.author = author;
    this.cover = cover;
    this.description = description || "Keine Beschreibung verfügbar";
    this.readStatus = false; // Defaultwert
  }

  getInfo() {
    return `Titel: ${this.title}, Autor: ${this.author}, Cover:${this.cover},Beschreibung: ${this.description}`;
  }

  markAsRead() {
    this.readStatus = true;
  }

  markAsUnread() {
    this.readStatus = false;
  }
}
