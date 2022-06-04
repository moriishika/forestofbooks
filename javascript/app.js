const bookTitle = document.getElementById("bookTitle");
const bookDesc = document.getElementById("bookDesc");
const bookStatus = document.getElementById("bookStatus");
const bookBoxContainer = document.querySelectorAll(".bookbox-container");
const localStorageKey = "BOOK_DATA";
const imagePreview = document.getElementById("imagePreview");
const saveButton = document.getElementById("saveButton");
const clearButton = document.getElementById("clearButton");
const imageInput = document.getElementById("image");
const bookContainers = document.querySelectorAll(".bookshelf");
const sortButton = document.querySelectorAll(".sort-button");
const modalContainer = document.querySelectorAll(".modal-container");
const sortOpener = document.querySelectorAll(".sortButton");
const searchInput = document.getElementById("searchBook");
const headerElement = document.querySelectorAll("header");

let books = [];
let isAdd = true;
let upperBookId;
let lastBook = {
  imageUrl: "https://images2.alphacoders.com/925/thumb-1920-925917.png",
  title: "Come on add your first book",
  desc: "by adding your last read book you can remember it since you got a lot of books",
};

//
const lastReadBook = (book) => {
  const { imageUrl, title, desc } = book;
  headerElement[0].innerHTML = `
 <div class="lastbook-desc flex flex-col hor-center">
        <h4>Last Read</h4>
        <h2>${title}</h2>
        <p>
          ${desc}
        </p>
        <div class="flex flex-wrap lastbook-buttons">
          <a
            class="lastbook-button button-blue button-noborder text-white"
            href="#bookshelf"
          >
            Go to the shelf
          </a>
          <a class="lastbook-button button-border-blue button-white" href="#bookbox">
            Add book
          </a>
        </div>
      </div>
      <div class="lastbook-image flex ver-center hor-center">
        <img src="${imageUrl}" />
      </div>
 `;
};

// function to create book element
const createBook = (bookId) => {
  const { imageUrl, title, desc, readStatus } = books[bookId];
  const bookElement = document.createElement("div");

  bookElement.classList.add("book", "flex", "flex-col", "ver-center");
  bookElement.innerHTML = `
    <img src=${imageUrl} class="book-img"/>
    <h1 class="text-bold">${title}</h1>
    <p>${desc}</p>
    <div class="flex book-buttons">
      <button id="deleteButton" class="book-button button-red button-noborder"  onclick="deleteBook(${bookId})">🗑️</button>
      <a href="#bookbox" id="updateButton" class="book-button button-green button-noborder" onclick="setUpdateBook(${bookId})">✏️</a>
    </div>
    <h2>${readStatus === "currentread" ? "current read" : readStatus}</h2>
  `;

  return bookElement;
};

if (typeof Storage !== "undefined") {
  //function to render books
  const renderBooks = (e) => {
    //check if the browser support localstorage API
    if (localStorage.getItem(localStorageKey) === null && books.length !== 0) {
      return;
    } else {
      // change the string from localstorage to an array
      books = JSON.parse(localStorage.getItem(localStorageKey));
    }

    //clean the old the elements inside the container
    bookContainers[1].innerHTML = "";
    bookContainers[2].innerHTML = "";
    bookContainers[3].innerHTML = "";
    bookContainers[0].innerHTML = "";

    // check the read status on each book and placed to the bookshelf accordingly
    if (books !== null) {
      for (let i = 0; i < books.length; i++) {
        if (books[i].readStatus === "complete") {
          bookContainers[2].appendChild(createBook(i));
        }

        if (books[i].readStatus === "incomplete") {
          bookContainers[3].appendChild(createBook(i));
        }
        if (books[i].readStatus === "currentread") {
          bookContainers[1].appendChild(createBook(i));
          lastBook = books[i];
        }

        if (books[i].title.toLowerCase().includes(e.currentTarget ? e.currentTarget.value.toLowerCase() : e.value.toLowerCase())) {
          bookContainers[0].appendChild(createBook(i));
        }
      }
    }

    lastReadBook(lastBook);
  };

  // added on input event listener for search input
  searchInput.oninput = (e) => {
    renderBooks(e);
  };

  //initial render
  renderBooks(searchInput);

  // function for clean the form
  const formCleaner = () => {
    isAdd = true;
    imagePreview.src =
      "https://images2.alphacoders.com/925/thumb-1920-925917.png";
    imageInput.value = "";
    bookTitle.value = "";
    bookDesc.value = "";
    bookStatus.value = "currentread";
  };

  // function to add and update book
  const saveBook = (e) => {
    e.preventDefault();

    const newBooks = {
      imageUrl: imagePreview.src,
      title: bookTitle.value,
      desc: bookDesc.value,
      readStatus: bookStatus.value,
    };

    if (books) {
      books = [...books, newBooks];
    } else {
      books = [newBooks];
    }

    if (!isAdd) {
      books.splice(upperBookId, 1);
      formCleaner();
    }

    localStorage.setItem(localStorageKey, JSON.stringify(books));
    renderBooks(searchInput);
  };

  saveButton.onclick = saveBook;

  //set value to each input based from the book that wants to be updated
  function setUpdateBook(bookId) {
    const { imageUrl, title, desc, readStatus } = books[bookId];
    imagePreview.src = imageUrl;
    imageInput.value = imageUrl;
    bookTitle.value = title;
    bookDesc.value = desc;
    bookStatus.value = readStatus;
    isAdd = false;
    upperBookId = bookId;
  }

  function deleteBook(bookId) {
    books.splice(bookId, 1);
    localStorage.setItem(localStorageKey, JSON.stringify(books));
    renderBooks(searchInput);
  }

  // added event listener to clean the form
  clearButton.onclick = (e) => {
    e.preventDefault();
    formCleaner();
  };

  imageInput.onchange = (e) => {
    imagePreview.src = e.currentTarget.value;
  };
} else {
  bookBoxContainer[0].innerHTML = `
    <h1 class="text-bold">Your Browser does not support storage API</h1>
  `;
}
