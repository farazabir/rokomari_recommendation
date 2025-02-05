document.onreadystatechange = function () {
  if (document.readyState === "complete") {
    observeDOMChanges();
  }
};

let debounceTimer = null;

function observeDOMChanges() {
  const observer = new MutationObserver(() => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      fetchAndInjectRecommendations();
    }, 2000);
  });

  observer.observe(document.body, { childList: true, subtree: true });

  fetchAndInjectRecommendations();
}

let lastFetchedBookId = null;

function fetchAndInjectRecommendations() {
  const url = window.location.href;
  const bookIdMatch = url.match(/\/book\/(\d+)\//);

  if (!bookIdMatch) {
    console.error("No book ID found in the URL.");
    return;
  }

  const bookId = bookIdMatch[1];

  if (bookId === lastFetchedBookId) {
    console.log("Already fetched Skipping request.");
    return;
  }

  lastFetchedBookId = bookId;

  chrome.runtime.sendMessage({ action: "fetchRecommendations", bookId });
}
