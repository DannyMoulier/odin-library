const myLibrary = [];
const modal = document.querySelector(".modal");
const openModalButton = document.querySelector(".main-button");
const closeModalButton = document.querySelector(".modal-close-button");
const form = document.querySelector("form");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  if (this.read) {
    return "read";
  } else {
    return "not read";
  }
};

function addBookToLibrary(e) {
  e.preventDefault();
  newBook = new Book(
    document.getElementById("title").value,
    document.getElementById("author").value,
    document.getElementById("pages").value,
    document.getElementById("is_read").checked
  );
  myLibrary.push(newBook);
  document.querySelector("form").reset();
}

function displayBooks() {
  const displayedBooks = document.querySelector(".main-books-container");

  function addElement(elClass, text, type, id) {
    const el = document.createElement(type);
    el.classList.add(elClass);
    el.id = id;
    if (text) {
      el.innerText = text;
    }
    return el;
  }

  displayedBooks.innerHTML = "";

  for (const book of myLibrary) {
    const bookCard = addElement("main-books-card", false, "div", book.title);
    displayedBooks.append(bookCard);

    const keys = Object.keys(book);

    for (const key of keys) {
      if (key !== "read") {
        bookCard.append(
          addElement("main-books-card-info", book[key], "div", book.title)
        );
      } else if (key === "read") {
        bookCard.append(
          addElement(
            "main-books-read-button",
            book.info(),
            "button",
            book.title
          )
        );
      }
    }
    const deleteButton = addElement(
      "main-books-remove-button",
      "Remove",
      "button",
      book.title
    );
    bookCard.append(deleteButton);
  }
  const readButtons = document.querySelectorAll(".main-books-read-button");
  readButtons.forEach((readButton) => {
    readButton.addEventListener("click", function () {
      const readIndex = myLibrary.findIndex(
        (book) => book.title === readButton.id
      );
      if (myLibrary[readIndex].read === true) {
        myLibrary[readIndex].read = false;
        readButton.innerText = myLibrary[readIndex].info();
        readButton.style.color = "red";
      } else {
        myLibrary[readIndex].read = true;
        readButton.innerText = myLibrary[readIndex].info();
        readButton.style.color = "green";
      }
    });
  });
  const deleteButtons = document.querySelectorAll(".main-books-remove-button");
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", function () {
      const deleteIndex = myLibrary.findIndex(
        (book) => book.title === deleteButton.id
      );
      myLibrary.splice(deleteIndex, 1);
      const bookToRemove = document.getElementById(deleteButton.id);
      bookToRemove.remove();
    });
  });
}

function styleReadButton() {
  const readButtons = document.querySelectorAll(".main-books-read-button");
  readButtons.forEach((readButton) => {
    if (readButton.innerText === "not read") {
      readButton.style.color = "red";
    } else {
      readButton.style.color = "green";
    }
  });
}

openModalButton.addEventListener("click", () => {
  modal.showModal();
});

form.addEventListener("submit", (e) => {
  addBookToLibrary(e);
  displayBooks();
  modal.close();
  styleReadButton();
});

modal.addEventListener("click", (e) => {
  const dialogDimensions = modal.getBoundingClientRect();
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    modal.close();
  }
});

// my girlfriend is the best
