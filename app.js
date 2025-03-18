const myLibrary = new Library();
const form = document.getElementById("book-form");

// Überprüfen, ob es bereits Bücher im Local Storage gibt
window.addEventListener("load", ()=>{
  const storedBooks = JSON.parse(localStorage.getItem("library"));

  if(storedBooks){
    //falls Bücher vorhanden, nur localStorage Daten nutzen
    myLibrary.books = storedBooks.map(bookData =>
      new Book(bookData.title, bookData.author, bookData.pages, bookData.genre)
    );
    displayBooks();
  } 
  else{
    // Falls keine Bücher im Local Storage sind, lade sie aus der JSON-Datei
    fetch("books.json")
      .then(response => response.json())
      .then(data => {
        myLibrary.books = data.books.map(bookData => 
          new Book(bookData.title, bookData.author, bookData.pages, bookData.genre)
        );
        saveToLocalStorage();
        displayBooks();
      })
      .catch(error => console.error("Fehler beim Laden der JSON Datei:", error));
  }
});

// Buch hinzufügen
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = document.getElementById("titel").value;
  const author = document.getElementById("author").value;
  const genre = document.getElementById("genre").value || "Uncategorized";
  const pages = parseInt(document.getElementById("seitenzahl").value);
  const readStatus = document.getElementById("read").checked;

  const newBook = new Book(title, author, pages, genre);

  if (readStatus) {
    newBook.markAsRead();
  }

  myLibrary.addBook(newBook);
  saveToLocalStorage();
  displayBooks();
  form.reset();
});

// Hilfsfunktion zum Speichern im Local Storage
function saveToLocalStorage() {
  localStorage.setItem("library", JSON.stringify(myLibrary.books));
}

// Funktion: Bücher im Grid anzeigen
function displayBooks() {
  const bookGrid = document.querySelector(".book-grid-list");
  bookGrid.innerHTML = ""; // Verhindert doppelte Einträge

  myLibrary.books.forEach(book => {
    let bookDiv = document.createElement("div");
    bookDiv.classList.add("book");

    bookDiv.innerHTML = `
    <div class="book-img-container">
      <img class="book-img" src="https://placehold.co/300x400" alt="image placeholder">
      <i id="unread" class="fa-solid fa-bookmark"></i>
      <i class="fa-solid fa-trash-can"></i>
    </div>

    <h3>${book.title}</h3>
    <p>${book.author}</p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque consequuntur, earum accusamus quae sequi at repellat assumenda.</p>
    <a href="#">Weiterlesen...</a>
    `;
    bookGrid.insertAdjacentElement("afterbegin", bookDiv);
  });
}


// Funktion: Buch löschen

// Modal öffen

document.addEventListener("DOMContentLoaded", ()=>{
  const modal = document.getElementById("delete-modal");
  const confirmDeleteBtn = document.getElementById("confirm-delete");
  const cancelDeleteBtn = document.getElementById("cancel-delete");
  let bookToDelete = null;

  document.body.addEventListener("click", (event)=>{
    if(event.target.classList.contains("fa-trash-can")){
      modal.style.display = "flex";
      bookToDelete = event.target.closest(".book");
    }
  });

  confirmDeleteBtn.addEventListener("click", ()=>{
    if(bookToDelete){
      //aus myLibrary.books entfernt
      const bookTitel = bookToDelete.querySelector("h3").textContent;
      myLibrary.removeTitle(bookTitel);

      // aus DOM entfernt
      bookToDelete.remove();
      bookToDelete = null;
      
      saveToLocalStorage();
    }
    modal.style.display ="none";
  
  });

  cancelDeleteBtn.addEventListener("click",()=>{
    modal.style.display = "none";
    bookToDelete = null;
  });

  window.addEventListener("click",(event)=>{
    if(event.target === modal){
      modal.style.display = "none";
      bookToDelete = null;
    }
  });
});


// Funktion: Mark as read


//Funktion: Filter nach Autor


//Funktion: Filter nach Titel

//Funktion: Filter nach Genre