export function setupSearch() {
  const searchButton = document.querySelector(".js-search-button");
  const searchInput = document.querySelector(".js-search-bar");

  searchButton.addEventListener("click", function () {
    const searchResult = searchInput.value;
    if (searchResult) {
      window.location.href = `amazon.html?search=${searchResult}`;
    } else {
      window.location.href = `amazon.html`;
    }
  });
}
