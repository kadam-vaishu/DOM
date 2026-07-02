
let books = [];


let addBooksection = document.querySelector(".add-book-section");
let toggleBtn = document.getElementById("toggle-btn");

toggleBtn.addEventListener("click", function () {
  if (addBooksection.style.display === "none") {
    addBooksection.style.display = "block";
    toggleBtn.textContent = "Hide Form";
  } else {
    addBooksection.style.display = "none";
    toggleBtn.textContent = "Add New Book";
  }
});


let typeSelect = document.getElementById("type");
let ebookDetails = document.getElementById("ebook-details");

typeSelect.addEventListener("change", function () {
  if (typeSelect.value === "ebook") {
    ebookDetails.style.display = "block";
  } else {
    ebookDetails.style.display = "none";
  }
});


class Book {
  constructor(title, author) {
    this.id = Date.now();
    this.title = title;
    this.author = author;
    this.type = "physical";
    this.available = true;
    this.borrower = null;
  }

  borrow(name) {
    this.available = false;
    this.borrower = name;
  }

  returnBook() {
    this.available = true;
    this.borrower = null;
  }

  getHTML() {
    const status = this.available
      ? "Available"
      : "Borrowed by " + this.borrower;

    const button = this.available
      ? `<button class="borrow-btn">Borrow</button>`
      : `<button class="return-btn">Return</button>`;

    return `
      <div class="book-card" data-id="${this.id}">
        <h3>${this.title}</h3>
        <p>Author: ${this.author}</p>
        <p>${status}</p>
        ${button}
        <button class="remove-btn">Remove</button>
      </div>
    `;
  }
}


class Ebook extends Book {
  constructor(title, author, fileSize) {
    super(title, author);
    this.type = "ebook";
    this.fileSize = fileSize;
  }

  borrow(name) {
    this.borrower = name;
  }

  returnBook() {
    this.borrower = null;
  }

  getHTML() {
    const status = this.borrower
      ? "Downloaded by " + this.borrower
      : "Available";

    const button = this.borrower
      ? `<button class="return-btn">Return</button>`
      : `<button class="borrow-btn">Download</button>`;

    return `
      <div class="book-card" data-id="${this.id}">
        <h3>${this.title} (E-Book)</h3>
        <p>Author: ${this.author}</p>
        <p>File Size: ${this.fileSize} MB</p>
        <p>${status}</p>
        ${button}
        <button class="remove-btn">Remove</button>
      </div>
    `;
  }
}

let bookForm = document.getElementById("book-form");

bookForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let type = document.getElementById("type").value;

  let book;

  if (type === "ebook") {
    let fileSize = document.getElementById("fileSize").value;
    book = new Ebook(title, author, fileSize);
  } else {
    book = new Book(title, author);
  }

  books.push(book);
  saveBooks();
  displayBooks();

  bookForm.reset();
});


function displayBooks() {
  let container = document.getElementById("book-list");
  container.innerHTML = "";

  if (books.length === 0) {
    container.textContent = "No Books Found";
    return;
  }

  books.forEach(book => {
    container.innerHTML += book.getHTML();
  });

  document.querySelectorAll(".borrow-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      let id = this.closest(".book-card").dataset.id;
      let name = prompt("Enter your name:");
      if (name) borrowBook(id, name);
    });
  });


  document.querySelectorAll(".return-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      let id = this.closest(".book-card").dataset.id;
      returnBook(id);
    });
  });


  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      let id = this.closest(".book-card").dataset.id;
      books = books.filter(b => b.id != id);
      saveBooks();
      displayBooks();
    });
  });
}


function borrowBook(id, name) {
  let book = books.find(b => b.id == id);
  if (book) book.borrow(name);
  saveBooks();
  displayBooks();
}


function returnBook(id) {
  let book = books.find(b => b.id == id);
  if (book) book.returnBook();
  saveBooks();
  displayBooks();
}


function saveBooks() {
  localStorage.setItem("booksData", JSON.stringify(books));
}


function loadBooks() {
  let data = localStorage.getItem("booksData");

  if (data) {
    let parsed = JSON.parse(data);

    books = parsed.map(obj => {
      let book;

      if (obj.type === "ebook") {
        book = new Ebook(obj.title, obj.author, obj.fileSize);
      } else {
        book = new Book(obj.title, obj.author);
      }

      book.id = obj.id;
      book.available = obj.available;
      book.borrower = obj.borrower;

      return book;
    });
  }
}


loadBooks();
displayBooks();