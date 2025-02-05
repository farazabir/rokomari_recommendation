chrome.runtime.onInstalled.addListener(() => {
  console.log("heyyyy");
});

setInterval(() => {}, 1000 * 60 * 5);

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === "fetchRecommendations" && message.bookId) {
    if (!sender || !sender.tab || !sender.tab.id) {
      console.error("no tab");
      return;
    }

    const bookId = message.bookId;
    const recommendationsUrl = `http://localhost:8000/recommend/${bookId}`;

    try {
      const response = await fetch(recommendationsUrl);
      if (!response.ok) throw new Error("err rec");

      const data = await response.json();

      chrome.scripting.executeScript({
        target: { tabId: sender.tab.id },
        func: injectBookList,
        args: [data.recommendations],
      });
    } catch (error) {
      console.error("err", error);
    }
  }
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (tab.url && tab.url.includes("rokomari.com/book/")) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content.js"],
      });
    }
  });
});

function injectBookList(recommendations) {
  const sidebar = document.querySelector(
    "#details-page > section.details-book-section.d-flex.align-items-base > div.sidebar-info"
  );

  if (!sidebar) {
    console.error("not found sidebar");
    setTimeout(() => injectBookList(recommendations), 500);
    return;
  }

  sidebar.innerHTML = "";

  //color used from https://colorhunt.co/palettes/popular

  const colors = {
    background: "#222831",
    cardBackground: "#393E46",
    border: "#112D4E",
    text: "#EEEEEE",
    accent: "#00ADB5",
  };

  sidebar.style.background = colors.background;
  sidebar.style.padding = "15px";
  sidebar.style.borderRadius = "8px";
  sidebar.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
  sidebar.style.fontFamily = "Arial, sans-serif";

  const header = document.createElement("h4");
  header.textContent = "Models Recommendations";

  header.style.color = colors.accent;
  header.style.fontWeight = "bold";
  header.style.fontSize = "24px";
  header.style.marginBottom = "20px";
  header.style.textAlign = "center";
  header.style.textTransform = "uppercase";
  header.style.letterSpacing = "1px";
  header.style.padding = "10px 0";

  sidebar.appendChild(header);

  const listContainer = document.createElement("div");
  listContainer.style.display = "flex";
  listContainer.style.flexDirection = "column";
  listContainer.style.gap = "10px";

  recommendations.forEach((book, index) => {
    const bookElement = document.createElement("div");
    bookElement.style.background = colors.cardBackground;
    bookElement.style.border = `1px solid ${colors.border}`;
    bookElement.style.padding = "10px";
    bookElement.style.borderRadius = "5px";
    bookElement.style.display = "flex";
    bookElement.style.alignItems = "center";
    bookElement.style.gap = "10px";
    bookElement.style.boxShadow = "2px 2px 5px rgba(0, 0, 0, 0.1)";
    bookElement.style.cursor = "pointer";

    const bookLink = document.createElement("a");
    bookLink.href = book.link;
    bookLink.textContent = `${index + 1}. ${book.book_name}`;
    bookLink.style.textDecoration = "none";
    bookLink.style.fontWeight = "bold";
    bookLink.style.color = colors.text;
    bookLink.target = "_blank";

    bookLink.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    bookElement.appendChild(bookLink);

    bookElement.addEventListener("click", () => {
      window.open(book.link, "_blank");
      console.log("Opening book link:", book.link);
    });

    listContainer.appendChild(bookElement);
  });

  sidebar.appendChild(listContainer);
}
