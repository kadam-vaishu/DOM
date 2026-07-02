let form = document.getElementById("bookmarkForm");
let bookmarksList = document.getElementById("bookmarksList");
let filterButtons = document.querySelectorAll(".filter-btn");

let bookmarks = [];
let currentFilter = "All";

function addBookMark(e) {
  e.preventDefault();

  let websiteTitle = document.getElementById("websiteTitle").value;
  let websiteUrl = document.getElementById("websiteUrl").value;
  let category = document.getElementById("category").value;

  let newBookmark = {
    id: Date.now(),
    title: websiteTitle,
    url: websiteUrl,
    category: category
  };

  bookmarks.push(newBookmark);

  saveBookmarks();
  renderBookmarks();

  form.reset();
}

function filterBookmarks(categoryFilter) {
  if (categoryFilter === "All") {
    return bookmarks;
  }

  return bookmarks.filter(function (bookmark) {
    return bookmark.category === categoryFilter;
  });
}

function renderBookmarks() {
  bookmarksList.innerHTML = "";

  let filteredBookmarks = filterBookmarks(currentFilter);

  if (filteredBookmarks.length === 0) {
    bookmarksList.innerHTML = "<p>No bookmarks found.</p>";
    return;
  }

  filteredBookmarks.forEach(function (bookmark) {

    let bookmarkElement = document.createElement("div");
    bookmarkElement.classList.add("bookmark-item");

    let infoDiv = document.createElement("div");
    infoDiv.classList.add("bookmark-info");

    let title = document.createElement("h3");
    title.textContent = bookmark.title;

    let link = document.createElement("a");
    link.href = bookmark.url;
    link.textContent = bookmark.url;
    link.target = "_blank";

    let categoryDiv = document.createElement("div");
    categoryDiv.classList.add("bookmark-category");
    categoryDiv.textContent = bookmark.category;

    infoDiv.appendChild(title);
    infoDiv.appendChild(link);
    infoDiv.appendChild(categoryDiv);

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", function () {
      deleteBookmark(bookmark.id);
    });

    bookmarkElement.appendChild(infoDiv);
    bookmarkElement.appendChild(deleteBtn);

    bookmarksList.appendChild(bookmarkElement);
  });
}

function deleteBookmark(id) {
  bookmarks = bookmarks.filter(function (bookmark) {
    return bookmark.id !== id;
  });

  saveBookmarks();
  renderBookmarks();
}

function saveBookmarks() {
  localStorage.setItem("bookmarksData", JSON.stringify(bookmarks));
}

function loadBookmarks() {
  let storedBookmarks = localStorage.getItem("bookmarksData");

  if (storedBookmarks) {
    bookmarks = JSON.parse(storedBookmarks);
  }
}

function init() {

  loadBookmarks();

  renderBookmarks();

  form.addEventListener("submit", addBookMark);

  filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      filterButtons.forEach(function (btn) {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      currentFilter = button.dataset.category;

      renderBookmarks();
    });
  });
}

document.addEventListener("DOMContentLoaded", init);