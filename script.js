
// Get all DOM elements
var popupBox = document.getElementById("popup-box");
var popupOverlay = document.getElementById("popup-overlay");
var addPopupBtn = document.getElementById("add-popup-btn");
var cancelPopup = document.getElementById("cancel-popup");
var bookForm = document.getElementById("book-form");
var bookList = document.getElementById("book-list");
// Show popup when "+" is clicked
addPopupBtn.addEventListener("click", () => {
popupOverlay.style.display = "block";
popupBox.style.display = "block";
});
// Hide popup when "Cancel" is clicked
cancelPopup.addEventListener("click", () => {
popupOverlay.style.display = "none";
popupBox.style.display = "none";
bookForm.reset();
});
// Load saved books from localStorage when page loads
window.addEventListener("DOMContentLoaded", () => {
  var savedBooks = JSON.parse(localStorage.getItem("books")) || [];
  savedBooks.forEach(book => {
    createBookCard(book.title, book.author, book.description);
  });
});
// Handle book addition
bookForm.addEventListener("submit", (event) => {
event.preventDefault();
// Get input values.trim() will remove unnessery spaces 
var title = document.getElementById("book-title-input").value.trim();
var author = document.getElementById("book-author-input").value.trim();
var description = document.getElementById("book-description-input").value.trim();
if (!title || !author || !description) {
  alert("Please fill all fields.");
  return;
}
// Create and show book card
createBookCard(title, author, description);
// Save to localStorage
const books = JSON.parse(localStorage.getItem("books")) || [];
books.push({ title, author, description });
localStorage.setItem("books", JSON.stringify(books));
// Reset and close popup
bookForm.reset();
popupOverlay.style.display = "none";
popupBox.style.display = "none";
});
// Function to create a book card and append it to the page
function createBookCard(title, author, description) {
const bookCard = document.createElement("div");
bookCard.className = "book-container";
bookCard.innerHTML = `
  <h3>Book: ${title}</h3>
  <p>${description}</p>
  <h4>Author: ${author}</h4>
  <button class="book-container-del-btn">Delete</button>
`;
//Add delete functionality
const deleteBtn = bookCard.querySelector(".book-container-del-btn");
deleteBtn.addEventListener("click", () => {
bookCard.remove();
deleteBookFromStorage(title);
});
// Append book card to list
bookList.appendChild(bookCard);
}
//Delete book from localStorage
function deleteBookFromStorage(title) {
let books = JSON.parse(localStorage.getItem("books")) || [];
books = books.filter(book => book.title !== title); // Match by title
localStorage.setItem("books", JSON.stringify(books));
}