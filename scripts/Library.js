// ---------------- Klasse Library ------------------ //

import { Book } from "./Book.js";

export class Library {
  constructor() {
    this.books = [];
    this.searchResults = [];
  }

  addBook(book) {
    if (book.title && book.author) {
      this.books.push(book); 
    } else {
      console.error("Buch benötigt einen Titel und einen Autor.");
    }
  }
  async fetchBooks(searchTerm, onAddBook) {
    const url = `https://openlibrary.org/search.json?q=${searchTerm}&limit=4`;
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      const searchResults = []; // Neue Variable nur für temporäre Anzeige
      data.docs.forEach((bookData) => {
        const title = bookData.title;
        const author = bookData.author_name
          ? bookData.author_name.join(", ")
          : "Unbekannt";
        const cover = bookData.cover_i
          ? `https://covers.openlibrary.org/b/id/${bookData.cover_i}-M.jpg`
          : '';
        const description = bookData.description || "Keine Beschreibung vorhanden";
  
        const book = new Book(title, author, cover, description);
        searchResults.push(book);
      });
  
      this.displaySearchedBooks(searchResults, onAddBook);
  
    } catch (error) {
      console.error("Fehler beim Abrufen der Bücher:", error);
    }
  }

  displaySearchedBooks(books, onAddBook) {
    const container = document.getElementById("book-container");
    container.innerHTML = ""; // Nur die Suchergebnisse anzeigen
  
    books.forEach((book) => {
      const bookElement = document.createElement("div");
      bookElement.classList.add("book");
  
      bookElement.innerHTML = `
        <div class="searchfield-addbook-hover">
          <button type="button" class="add-book-button">Buch hinzufügen</button>
        </div>
        <div class="book-img-container">
          <img class="book-img" src="${book.cover}" alt="">
          <i id="unread" class="fa-solid fa-bookmark"></i>
          <i class="fa-solid fa-trash-can"></i>
        </div>
        <div class="book-content-container">
          <div>
            <h3>${book.title}</h3>
            <p>${book.author}</p>
            <p>${book.description}</p>
          </div>
          <a href="#">Weiterlesen...</a>
        </div>
      `;
  
      const addButton = bookElement.querySelector(".add-book-button");
      addButton.addEventListener("click", () => {
        console.log("DEBUG book hinzugefügt:", book);
  
        if (!book.title || !book.author) {
          alert("Dieses Buch hat keine vollständigen Informationen.");
          return;
        }
  
        const newBook = new Book(book.title, book.author, book.cover, book.description);
        this.addBook(newBook);
  
        if (typeof onAddBook === "function") {
          onAddBook(); // z. B. saveToLocalStorage + displayBooks
        }
        const searchInputField = document.getElementById("searchInput");
        searchInputField.value="";
      });
  
      container.appendChild(bookElement);

    });
  }

  listBooks() {
    this.books.forEach((book) => {
      console.log(book.getInfo()); // Ruft für jedes Buch die Info auf und gibt sie aus
    });
  }

  findTitle(title) {
    return this.books.filter(
      (book) => book.title.toLowerCase() === title.toLowerCase()
    );
  }

  removeTitle(title) {
    this.books = this.books.filter(
      (book) => book.title.toLowerCase() !== title.toLowerCase()
    );
  }
}
