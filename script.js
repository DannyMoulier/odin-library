const myLibrary = [];
const modal = document.querySelector('.modal');
const modalBox = document.querySelector('.dialog-box');
const openModalButton = document.querySelector('.main-button');
const closeModalButton = document.querySelector('.modal-close-button');
const form = document.querySelector('form');
const ifExists = document.querySelector('.book-exists-indication');
const colorSchemeButton = document.querySelector('.colorscheme-button');

class Book {
  constructor(title, author, pages, read) {
    this.title = '"' + title + '"';
    this.author = 'by ' + author;
    this.pages = pages + ' pages';
    this.read = read;
  }
  info() {
    if (this.read) {
      return 'Read';
    } else {
      return 'Not read';
    }
  }
}

const book1 = new Book('To Kill a Mockingbird', 'Harper Lee', 281, true);
const book2 = new Book('1984', 'George Orwell', 328, true);
const book3 = new Book(
  "Harry Potter and the Sorcerer's Stone",
  'J.K. Rowling',
  309,
  false
);
const book4 = new Book('The Catcher in the Rye', 'J.D. Salinger', 224, false);
const book5 = new Book('The Great Gatsby', 'F. Scott Fitzgerald', 180, true);
const book6 = new Book('test', 'test', 123, false);

myLibrary.push(book1, book2, book3, book4, book5, book6);

// max pages in book = 100000

function addBookToLibrary(e) {
  e.preventDefault();
  newBook = new Book(
    document.getElementById('title').value,
    document.getElementById('author').value,
    document.getElementById('pages').value,
    document.getElementById('is_read').checked
  );
  const find = myLibrary.find(
    (book) =>
      book.title.toLowerCase() === newBook.title.toLowerCase() &&
      book.author.toLowerCase() === newBook.author.toLowerCase()
  );
  if (find) {
    ifExists.innerText = 'Book already exists';
    return false;
  } else {
    ifExists.innerText = '';
    myLibrary.push(newBook);
    document.querySelector('form').reset();
    return true;
  }
}

function displayBooks() {
  const displayedBooks = document.querySelector('.main-books-container');

  function addElement(elClass, text, type, id) {
    const el = document.createElement(type);
    el.classList.add(elClass);
    el.id = id;
    if (text) {
      el.innerText = text;
    }
    return el;
  }

  displayedBooks.innerHTML = '';

  for (const book of myLibrary) {
    const bookCard = addElement(
      'main-books-card',
      false,
      'div',
      book.title + book.author
    );
    displayedBooks.append(bookCard);

    const keys = Object.keys(book);

    for (const key of keys) {
      if (key !== 'read') {
        bookCard.append(
          addElement(
            'main-books-card-info',
            book[key],
            'div',
            book.title + book.author
          )
        );
      } else if (key === 'read') {
        bookCard.append(
          addElement(
            'main-books-read-button',
            book.info(),
            'button',
            book.title + book.author
          )
        );
      }
    }
    const deleteButton = addElement(
      'main-books-remove-button',
      'Remove',
      'button',
      book.title + book.author
    );
    bookCard.append(deleteButton);
  }
  const readButtons = document.querySelectorAll('.main-books-read-button');
  readButtons.forEach((readButton) => {
    readButton.addEventListener('click', function () {
      const readIndex = myLibrary.findIndex(
        (book) => book.title + book.author === readButton.id
      );
      if (myLibrary[readIndex].read === true) {
        myLibrary[readIndex].read = false;
        readButton.innerText = myLibrary[readIndex].info();
        readButton.style.background = '#ff453a';
      } else {
        myLibrary[readIndex].read = true;
        readButton.innerText = myLibrary[readIndex].info();
        readButton.style.background = '#34aadc';
      }
    });
    readButton.addEventListener('mouseover', function () {
      if (readButton.style.background === 'rgb(255, 69, 58)') {
        readButton.style.background = 'rgb(252, 109, 101)';
      } else if (readButton.style.background === 'rgb(52, 170, 220)') {
        readButton.style.background = 'rgb(100, 186, 222)';
      }
    });
    readButton.addEventListener('mouseout', function () {
      if (readButton.style.background === 'rgb(252, 109, 101)') {
        readButton.style.background = 'rgb(255, 69, 58)';
      } else if (readButton.style.background === 'rgb(100, 186, 222)') {
        readButton.style.background = 'rgb(52, 170, 220)';
      }
    });
  });
  const deleteButtons = document.querySelectorAll('.main-books-remove-button');
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener('click', function () {
      const deleteIndex = myLibrary.findIndex(
        (book) => book.title + book.author === deleteButton.id
      );
      myLibrary.splice(deleteIndex, 1);
      const bookToRemove = document.getElementById(deleteButton.id);
      bookToRemove.remove();
    });
  });
}

function styleReadButton() {
  const readButtons = document.querySelectorAll('.main-books-read-button');
  readButtons.forEach((readButton) => {
    if (readButton.innerText === 'Not read') {
      readButton.style.background = '#ff453a';
    } else {
      readButton.style.background = '#34aadc';
    }
  });
}

function checkSchemeIcon() {
  const svgIcon = document.querySelector('.color-scheme-icon');
  const sunIcon = `<path d="M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5,5-2.24,5-5-2.24-5-5-5Zm0,7c-1.1,0-2-.9-2-2s.9-2,2-2,2,.9,2,2-.9,2-2,2Zm4.95-6.95c-.59-.59-.59-1.54,0-2.12l1.41-1.41c.59-.59,1.54-.59,2.12,0,.59,.59,.59,1.54,0,2.12l-1.41,1.41c-.29,.29-.68,.44-1.06,.44s-.77-.15-1.06-.44ZM7.05,16.95c.59,.59,.59,1.54,0,2.12l-1.41,1.41c-.29,.29-.68,.44-1.06,.44s-.77-.15-1.06-.44c-.59-.59-.59-1.54,0-2.12l1.41-1.41c.59-.59,1.54-.59,2.12,0ZM3.51,5.64c-.59-.59-.59-1.54,0-2.12,.59-.59,1.54-.59,2.12,0l1.41,1.41c.59,.59,.59,1.54,0,2.12-.29,.29-.68,.44-1.06,.44s-.77-.15-1.06-.44l-1.41-1.41Zm16.97,12.73c.59,.59,.59,1.54,0,2.12-.29,.29-.68,.44-1.06,.44s-.77-.15-1.06-.44l-1.41-1.41c-.59-.59-.59-1.54,0-2.12,.59-.59,1.54-.59,2.12,0l1.41,1.41Zm3.51-6.36c0,.83-.67,1.5-1.5,1.5h-2c-.83,0-1.5-.67-1.5-1.5s.67-1.5,1.5-1.5h2c.83,0,1.5,.67,1.5,1.5ZM3.5,13.5H1.5c-.83,0-1.5-.67-1.5-1.5s.67-1.5,1.5-1.5H3.5c.83,0,1.5,.67,1.5,1.5s-.67,1.5-1.5,1.5ZM10.5,3.5V1.5c0-.83,.67-1.5,1.5-1.5s1.5,.67,1.5,1.5V3.5c0,.83-.67,1.5-1.5,1.5s-1.5-.67-1.5-1.5Zm3,17v2c0,.83-.67,1.5-1.5,1.5s-1.5-.67-1.5-1.5v-2c0-.83,.67-1.5,1.5-1.5s1.5,.67,1.5,1.5Z"/>`;
  const moonIcon = `<path d="M15,24A12,12,0,1,1,19.058.71a2.93,2.93,0,0,1,.814,5.067c-5.1,3.92-5.088,8.539,0,12.446a2.93,2.93,0,0,1-.816,5.067A12.2,12.2,0,0,1,15,24ZM15,3a9,9,0,1,0,2.925,17.508c-6.511-5.065-6.489-11.969,0-17.016A9.322,9.322,0,0,0,15,3Z"/>`;
  if (document.body.classList.contains('dark-mode')) {
    svgIcon.innerHTML = sunIcon;
  } else {
    svgIcon.innerHTML = moonIcon;
  }
}

colorSchemeButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  checkSchemeIcon();
});

openModalButton.addEventListener('click', () => {
  modal.showModal();
});

form.addEventListener('submit', (e) => {
  if (addBookToLibrary(e)) {
    displayBooks();
    modal.close();
    styleReadButton();
  } else {
    console.log('book already added');
  }
});

modal.addEventListener('click', (e) => {
  if (e.target == modal) {
    modal.close();
  }
});

displayBooks();
styleReadButton();
checkSchemeIcon();
