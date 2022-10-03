
const searchBtnClose = document.querySelector(".search-close-btn");
const openBtn = document.querySelector(".mobile-sidebar")

searchBtnClose.addEventListener("click", () => {
  searchBtnClose.style.display = "none";
});

openBtn.addEventListener("click", () => {
  searchBtnClose.style.display = "block";
})