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

let books = [];
let isAdd = true;
let upperBookId;

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
  const renderBooks = () => {
    if (localStorage.getItem(localStorageKey) === null && books.length !== 0) {
      return;
    } else {
      books = JSON.parse(localStorage.getItem(localStorageKey));
      // console.log(books);

      // let sortedBooks = [];

      // books.forEach((book) => {
      //   if (book.readStatus === "complete") {
      //     bookContainers[0].appendChild(createBook(i));
      //   }
      //   if (book.readStatus === "incomplete") {
      //     bookContainers[1].appendChild(createBook(i));

      //   }

      //   if (book.readStatus === "currentread") {
      //     bookContainers[2].appendChild(createBook(i));
      //   }
      // });

      // books = sortedBooks;
    }

    bookContainers[0].innerHTML = "";
    bookContainers[1].innerHTML = "";
    bookContainers[2].innerHTML = "";

    for (let i = 0; i < books.length; i++) {
      if (books[i].readStatus === "complete") {
        bookContainers[1].appendChild(createBook(i));
      }
      if (books[i].readStatus === "incomplete") {
        bookContainers[2].appendChild(createBook(i));
      }

      if (books[i].readStatus === "currentread") {
        bookContainers[0].appendChild(createBook(i));
      }
    }
  };

  renderBooks();

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

  const saveBook = (e) => {
    e.preventDefault();
    const newBooks = {
      imageUrl: imagePreview.src,
      title: bookTitle.value,
      desc: bookDesc.value,
      readStatus: bookStatus.value,
    };

    books = [...books, newBooks];

    if (!isAdd) {
      books.splice(upperBookId, 1);
      isAdd = true;
      imagePreview.src = "https://images2.alphacoders.com/925/thumb-1920-925917.png"
      imageInput.value = "";
      bookTitle.value = "";
      bookDesc.value = "";
      bookStatus.value = "currentread";
    }
    localStorage.setItem(localStorageKey, JSON.stringify(books));
    console.log("updated");
    console.log(books);
    renderBooks();
  };

  function deleteBook(bookId) {
    books.splice(bookId, 1);
    localStorage.setItem(localStorageKey, JSON.stringify(books));
    renderBooks();
  }

  // sortOpener[0].onclick = () => {
  //   modalContainer[0].style.visibility = "visible";
  // };

  sortButton[3].onclick = () => {
    modalContainer[0].style.visibility = "hidden";
  };

  saveButton.onclick = saveBook;
  clearButton.onclick = (e) => {
    e.preventDefault();
    imagePreview.src= "https://images2.alphacoders.com/925/thumb-1920-925917.png"
    imageInput.value = "";
    bookTitle.value = "";
    bookDesc.value = "";
    bookStatus.value = "currentread";
    isAdd = true;
  };

  imageInput.onchange = (e) => {
    imagePreview.src = e.currentTarget.value;
  };
} else {
  bookBoxContainer[0].innerHTML = `
    <h1 class="text-bold">Your Browser does not support storage API</h1>
  `;
}

// let booksArray = [
//   "The rudest book ever",
//   "The millionaire fastlane",
//   "Happy sexy millionaire",
//   "Dune",
//   "Harry Potter books",
//   "To kill a mockingbird",
//   "5 am club",
//   "The intelligent investor",
//   "The Warren Buffett way",
//   "Ikigai",
//   "Secret by Rhonda bruyne",
//   "The everyday manifesifesto",
//   "Flow",
//   "Think and grow rich",
//   "Zero to one",
//   "Mastery",
//   "Atomic habits",
//   "The $100 startup",
//   "The power of habit",
//   "Life amazing secret",
//   "Awaken the giant within",
//   "Miracle morning",
//   "The Lord of rings",
//   "The davinci code",
//   "Eat that frog",
//   "12 rules of life by Jordan peterson",
// ];

// if (localStorage.getItem(localStorageKey) === null) {

//   console.log("masuk 2 ");
//   localStorage.setItem(
//     localStorageKey,
//     JSON.stringify([
//       {
//         imageUrl:
//           "https://c4.wallpaperflare.com/wallpaper/405/422/518/anime-anime-girls-balalaika-black-lagoon-blonde-hd-wallpaper-preview.jpg",
//         title: "Balalaika Life",
//         desc: "This is balalika book that really interesting. The story is pretty dark because she had to survived in a world war condition",
//         readStatus: "complete",
//       },
//     ])
//   );
//   renderBooks();
// } else {
//   books = JSON.parse(localStorage.getItem(localStorageKey));
//   renderBooks();
// }

// function sortBooks(sortOption) {
//   let sortedBooks = [];
//   books.forEach((book) => {
//     if (sortOption === "complete" && book.readStatus === "complete") {
//       sortedBooks.unshift(book);
//     }

//     if (sortOption === "incomplete" && book.readStatus === "incomplete") {
//       sortedBooks.unshift(book);
//     }

//     if (sortOption === "currentread" && book.readStatus === "currentread") {
//       sortedBooks.unshift(book);
//     }

//     if (book.readStatus !== sortOption) {
//       sortedBooks.push(book);
//     }
//   });
//   books = sortedBooks;
//   console.log(books);
//   bookContainers[0].innerHTML = "";
//   for (let i = 0; i < books.length; i++) {
//     bookContainers[0].appendChild(createBook(i));
//   }
// }
