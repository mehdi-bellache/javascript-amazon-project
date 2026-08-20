function performSearch() {
  const searchInput = document.querySelector(".js-search-bar");
  const searchResult = searchInput.value;
  if (searchResult) {
    window.location.href = `amazon.html?search=${searchResult}`;
  } else {
    window.location.href = `amazon.html`;
  }
}

export function setupSearch() {
  const searchButton = document.querySelector(".js-search-button");
  const searchInput = document.querySelector(".js-search-bar");

  searchButton.addEventListener("click", performSearch);

  searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      performSearch();
    }
  });
}
