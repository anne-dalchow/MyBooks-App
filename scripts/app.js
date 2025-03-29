const myLibrary = new Library();
const form = document.getElementById("book-form");

// Überprüfen, ob es bereits Bücher im Local Storage gibt
window.addEventListener("load", () => {
  const storedBooks = JSON.parse(localStorage.getItem("library"));

  if (storedBooks) {
    //falls Bücher vorhanden, nur localStorage Daten nutzen
    myLibrary.books = storedBooks.map(
      (bookData) =>
        new Book(
          bookData.title,
          bookData.author,
          bookData.pages,
          bookData.genre,
          bookData.description || "No description available"
        )
    );

    displayBooks();
  } else {
    // Falls keine Bücher im Local Storage sind, lade sie aus der JSON-Datei
    fetch("./json/books.json")
      .then((response) => response.json())
      .then((data) => {
        myLibrary.books = data.books.map(
          (bookData) =>
            new Book(
              bookData.title,
              bookData.author,
              bookData.pages,
              bookData.genre,
              bookData.description || "No description available"
            )
        );
        saveToLocalStorage();
        displayBooks();
      })
      .catch((error) =>
        console.error("Fehler beim Laden der JSON Datei:", error)
      );
  }
});


// Buch hinzufügen
function addBook(event){
    event.preventDefault();

  const title = document.getElementById("titel").value;
  const author = document.getElementById("author").value;
  const genre = document.getElementById("genre").value || "Uncategorized";
  const pages = parseInt(document.getElementById("seitenzahl").value);
  // const readStatus = document.getElementById("read").checked;
  const description = document.getElementById("description").value;

  const newBook = new Book(title, author, pages, genre, description);

  // if (readStatus) {
  //   newBook.markAsRead();
  // }

  myLibrary.addBook(newBook);
  saveToLocalStorage();
  displayBooks();
  form.reset();

}

// Hilfsfunktion zum Speichern im Local Storage
function saveToLocalStorage() {
  console.log("Vor dem Speichern in localStorage:", myLibrary.books);
  localStorage.setItem("library", JSON.stringify(myLibrary.books));
}

// Funktion: Bücher im Grid anzeigen
function displayBooks() {
  const bookGrid = document.querySelector(".book-grid-list");
  bookGrid.innerHTML = ""; // Verhindert doppelte Einträge

  myLibrary.books.forEach((book) => {
    let bookDiv = document.createElement("div");
    bookDiv.classList.add("book");

    bookDiv.innerHTML = `
    <div class="book-img-container">
      <img class="book-img" src="./assets/img/book_temp.png" alt="image placeholder">
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
    bookGrid.insertAdjacentElement("afterbegin", bookDiv);
  });
}

// Funktion: Buch löschen

// Modal öffen

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("delete-modal");
  const confirmDeleteBtn = document.getElementById("confirm-delete");
  const cancelDeleteBtn = document.getElementById("cancel-delete");
  let bookToDelete = null;

  document.body.addEventListener("click", (event) => {
    // Überprüfen, ob auf das Löschen-Icon geklickt wurde
    if (event.target.classList.contains("fa-trash-can")) {
      modal.style.display = "flex"; // Modal anzeigen
      bookToDelete = event.target.closest(".book"); // Das Buch, das gelöscht werden soll
    }
  });

  confirmDeleteBtn.addEventListener("click", () => {
    if (bookToDelete) {
      //aus myLibrary.books entfernt
      const bookTitel = bookToDelete.querySelector("h3").textContent;
      myLibrary.removeTitle(bookTitel);

      // aus DOM entfernt
      bookToDelete.remove();
      bookToDelete = null;

      // Änderungen im Local Storage speichern
      saveToLocalStorage();
    }

    // Modal schließen
    modal.style.display = "none";
  });

  cancelDeleteBtn.addEventListener("click", () => {
    // Modal schließen, ohne zu löschen
    modal.style.display = "none";
    bookToDelete = null;
  });

  window.addEventListener("click", (event) => {
    // Klick außerhalb des Modals schließt das Modal
    if (event.target === modal) {
      modal.style.display = "none";
      bookToDelete = null;
    }
  });
});

// Funktion, Beschreibung übernehmen -> default Text, falls keine vorhanden ist

// Funktion: Mark as read

//Funktion: Filter nach Autor, Titel, Genre, Gelesen, Ungelesen

/** Beim click auf go button -> value aus dem Filter dropdown menü nehmen (entweder titel, autor,genre, gelesen, ungelesen )
    filter value === autor, oder value === titel, value === genre, value === gelesen, value === ungelesen (vielleicht mit switch case)
    dann book-grid-list leeren
    book grid list mit büchern, die dem Fall entsprechen füllen
    und Titelfilter "All books" auf value setzen, wie "Fantasy", Hermann Hesse, oder was auch immer
 */

//Funktion: Filter nach Titel

//Funktion: Filter nach Genre

// Sortieren Funktion

// Button in Nav Bar oben für Buch hinzufügen -> leitet zum Formular
